var express = require('express');
var router = express.Router();
var cron = require('node-cron');
const wiki = require('../wiki')


var authMiddleware = require('../middleware').auth;

const separators = new Set(["\n", "(", ")", " ", ",", ".", ";", ":", "_", "-", "“", "”", "&", "$", "€", "@", "ª", "º", "!", "¡", "?", "¿", "}", "{", "}", "[", "]", "<", ">", "#", "~", "%", "¬", "/", "\\", "\"", "*", "^", "<", "/", ">"]);

const queue = []

let title = []
let text = [];

let today = wiki.getContent().then(today => {
  title = [today.title];
  text = [today.content];
})



cron.schedule('0 0 * * *', function() {
  wiki.getContent().then((today) => {
    text = [today.content]
    title = [today.title]
  })
});



/* GET home page. */
router.get('', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.send({
    separators: [...separators],
    words: getText(text),
    title: getText(title)
  });
});

router.post('/test', authMiddleware,  function(req, res, next) {
  let text = [req.body.text];
  let title = [req.body.title];
  res.send({
    separators: [...separators],
    words: getText(text),
    title: getText(title)
  });
});

router.post('/add', authMiddleware,  function(req, res, next) {
  let text = req.body.text;
  let title = req.body.title;
  queue.push({
    words: text,
    title: title
  })
  res.send({
    separators: [...separators],
    words: getText([text]),
    title: getText([title])
  });
});

function getText(words){
  wordList = words;  

  for (let separator of separators) {
      wordList = splitWords(wordList, separator);
  }
  return wordList;
}

function splitWords(text, separator) {
  let result = [];
  for (let posibleWord of text){
      if(posibleWord === separator){
          result.push(separator);
      } else if(posibleWord.includes(separator)){
          words = posibleWord.split(separator);
          result.push(...getZippedList(words, separator));
      } else {
          result.push(posibleWord);
      }
  }
  return result;
}

function getZippedList(words, splitter) {
  let result = [];
  for (let i = 0; i<words.length; i++){
    let word = words[i]
    if(i == 0){
      if (word === ""){
        result.push(splitter)
      } else {
        result.push(word)
      }
    }else if (i == words.length - 1){
      result.push(splitter)
      if (word !== ""){
        result.push(word)
      }
    }else {
      result.push(splitter)
      result.push(word)
    }
  }
  return result;
}

module.exports = router;
