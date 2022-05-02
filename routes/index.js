var express = require('express');
var router = express.Router();
var cron = require('node-cron');

var authMiddleware = require('../middleware').auth;

const separators = new Set(["\n", "(", ")", " ", ",", ".", ";", ":", "_", "-", "“", "”", "&", "$", "€", "@", "ª", "º", "!", "¡", "?", "¿", "}", "{", "}", "[", "]", "<", ">", "#", "~", "%", "¬", "/", "\\", "=", "\"", "*", "^", "<", "/", ">"]);

const queue = []

let text = [
  "El Hospital de Santa María Magdalena fue un recinto hospitalario fundado en el año 1540 por doña Mencía de Mendoza. Se encuentran a las afueras de la localidad de Fuentidueña, provincia de Segovia, (España). Es un Bien de Interés Cultural del patrimonio histórico de España, su estado es de ruina.\n" +
  "\n" +
  "Historia\n" +
  "\n" +
  "El Hospital de Santa María Magdalena fue fundado en el año de 1540, por doña Mencía de Mendoza, que dejó en su testamento los medios necesarios. Estuvo en funcionamiento hasta mediados del siglo XIX (año de 1853) en que fue incautado por el Estado y anulado su uso. Fue un centro asistencial de gran importancia, ejemplo del método sanitario aplicado durante la Edad Moderna y que tan notables servicios otorgó a la sociedad civil de la época.\n" +
  "Dentro de la tipología de hospitales renacentistas constituye igualmente un caso ejemplar, por la capacidad y calidad de sus servicios y por la conformación de sus distintas dependencias. Los nuevos métodos sanitarios del siglo XIX provocaron su abandono y posterior ruina, aunque esta no se produjo masivamente hasta muy avanzado el siglo XX.\n" +
  "\n" +
  "Descripción\n" +
  "Se levantó adherido a la muralla, junto a la iglesia de San Miguel y en las proximidades del castillo, en el lado noroeste de la localidad. Y su advocación a María Magdalena remite a su labor y generosidad.\n" +
  "\n" +
  "En planta se componía de un gran cuadrángulo con patio cerrado con columnas y con acceso por puertas a dos lados y rodeado de dos galerías, que estaba en pie todavía en 1932. Alrededor de estas se disponían las sucesivas dependencias. En la esquina habitada se ubicaba la capilla con arcos rebajados abiertos a las naves transversales, a la altura de las tres plantas para su visión directa, siendo así un sistema simplificado a la mitad de los hospitales en cruz de los Reyes Católicos y el gran cardenal don Pedro González de Mendoza, de finales del siglo XV y comienzos del siglo XVI. Así pues, junto a la capilla –de planta cuadrada- se abrían dos crujías en ángulo recto o forma de “L” con dependencias para las distintas clases de enfermos. Hoy, apenas se conservan restos de aquellas, como sus dos grandes arcos y algunos muros en el costado norte.\n" +
  "\n" +
  "Estaba construido en buena piedra caliza, en sillares y en mampostería.\n" +
  "\n" +
  "Tenía tres plantas. En el muro norte se advierte el sistema constructivo empleado con sillería de piedra y mampostería al interior. La planta baja tenía menos aberturas, dos grandes vanos de arco de medio punto, en la planta siguiente ventanas de arco rebajado y en la superior ocho ventanas rectangulares que comunicaban con las celdas corridas y abiertas.\n" +
  "\n" +
  "En la fachada norte se observa hasta cuatro alturas, tres de funcionalidad hospitalaria y un sótano de almacén.\n" +
  "\n" +
  "Se conserva una puerta de acceso en el muro oriental con arco de medio punto y dovelas de buen tamaño.\n" +
  "\n" +
  "En la capilla, los arcos arruinados se levantaban sobre pilares de columnas dobles adosadas con capitel sencillo de referencia al estilo toscano de la primera mitad del siglo XVI."];

let title = ["Hospital de Santa María Magdalena (Fuentidueña)"]


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

router.post('/test', authMiddleware,  function(req, res, next) {
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