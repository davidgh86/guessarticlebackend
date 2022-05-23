var express = require('express');
var router = express.Router();
var cron = require('node-cron');

var authMiddleware = require('../middleware').auth;

const separators = new Set(["\n", "(", ")", " ", ",", ".", ";", ":", "_", "-", "“", "”", "&", "$", "€", "@", "ª", "º", "!", "¡", "?", "¿", "}", "{", "}", "[", "]", "<", ">", "#", "~", "%", "¬", "/", "\\", "=", "\"", "*", "^", "<", "/", ">"]);

const queue = []

let text = ["Anna Held"];

let title = ["Helene Anna Held (Varsovia, 8 de marzo de 1872-Nueva York, 12 de agosto de 1918) fue una actriz polaca de teatro y vodevil.\n\nNació en Polonia, cuando aún era parte del Imperio ruso. Fue la hija de un fabricante de guantes judío, Shimmle Held, y de su esposa franco-judía, Yvonne Pierre. En 1881, los progromos antisemitas forzaron a su familia a huir a París. Cuando el negocio de guantes de su padre quebró, tomó un empleo como portero, mientras su madre atendía un restaurante kosher. Held comenzó a trabajar en la industria textil para posteriormente trabajar de cantante en los teatros judíos de París. Después de la muerte de su padre, se mudó a Londres, donde siguió siendo cantante e incluso logró un papel en la producción Shulamith de Abraham Goldfraden y dirigida por Jacob Adler.\n\nSus inicios\nSu personalidad vivaz y animada le ayudaron a adquirir reconocimiento, empezando a ser conocida por cantar canciones un tanto atrevidas para la época, su coquetería y su deseo de mostrar sus piernas en el escenario. Alrededor de esta época, se casó en 1894 con Máximo Carrera, un playboy uruguayo mucho mayor que ella, con quien tuvo una hija, Liane (1895-1988), quien también se convirtió en actriz y productora.\n\nDurante una gira por Europa conoció a Florenz Ziegfeld, quien le pidió que fuera a Nueva York con él, que manipuló a la prensa para crear una oleada de interés público mucho antes incluso de llegar a los Estados Unidos, por lo que cuando ella desembarcó ya era el blanco de muchas especulaciones. Cuando finalmente apareció en escena, la crítica no fue muy benevolente con ella, pero al público pareció no importarle y la apoyaron.1\u200B\n\nBroadway\nA partir de 1905, Held disfrutó de varios éxitos en Broadway, que la convirtieron en millonaria. La habilidad de Ziegfeld de manipular a la prensa a su favor, le aseguró la permanencia del nombre de Held y el suyo en los medios de comunicación. Ziegfeld tuvo un amorío con la actriz Lilliane Lorraine y luego con Billie Burke, con quien se casaría en 1914, dejando para siempre a Held.\n\nHeld pasó los primeros años de la Primera Guerra Mundial haciendo vodevil de gira en Francia, presentándose ante los soldados franceses y recaudando dinero para la guerra. Se la consideró una heroína por sus contribuciones y su coraje al viajar al frente de guerra. Regresó a Nueva York y allí fue elegida para protagonizar una película Madame le Presidente en 1916.\n\nPasó 1917 de gira por Estados Unidos pero su salud empezó a declinar y en enero de 1918 colapsó en el escenario. Retirada en el Hotel Savoy de Nueva York, murió allí unos meses después por mieloma múltiple a la edad de 46 años. Como conversa al catolicismo desde joven, su funeral se celebró en la iglesia de San Patricio de Manhattan y fue enterrada en el Cemetery of the Gate of Heaven en Hawthorne, Nueva York.2\u200B Ziegfeld fue muy criticado por la prensa por haber tratado mal a Held y su aparente indiferencia ante su enfermedad, además de que no estuvo en su funeral, debido a su fobia hacia la muerte.\n\nEl gran Ziegfeld\nLa película El gran Ziegfeld (1936) cuenta la historia un poco exagerada del triángulo amoroso Ziegfeld-Held-Burke. Luise Rainer ganó un Oscar por su interpretación de Held, mientras que Ziegfeld y Burke fueron interpretados por William Powell y Myrna Loy.\n"]


cron.schedule('0 0 * * *', () => {
  let today = queue.shift()
  text = [today.words]
  title = [today.title]
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
