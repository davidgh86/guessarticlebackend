var express = require('express');
var router = express.Router();
var cron = require('node-cron');

var authMiddleware = require('../middleware').auth;

const separators = new Set(["\n", "(", ")", " ", ",", ".", ";", ":", "_", "-", "“", "”", "&", "$", "€", "@", "ª", "º", "!", "¡", "?", "¿", "}", "{", "}", "[", "]", "<", ">", "#", "~", "%", "¬", "/", "\\", "=", "\"", "*", "^", "<", "/", ">"]);

const queue = []

let title = ["MONIAC"];

let text = ["El MONIAC (Monetary National Income Analogue Computer, que en castellano equivaldría a \"Computador analógico de la renta nacional monetaria\") también conocido como el Computador Hidráulico de Phillips y el Finanzhalógrafo, fue creado en 1949 por el economista neozelandés William \"Bill\" Phillips) para representar el modelo económico nacional del Reino Unido, cuando todavía era estudiante en la Escuela de Economía de Londres (LSE). El computador utilizaba lógica de fluidos para modelar el funcionamiento de una economía. El nombre en inglés puede haber sido sugerido por la asociación de las palabras dinero (money) y ENIAC, por el nombre de uno de los primeros computadores digitales.\n\nDescripción\n\nEl computador medía aprox. 2 m de alto, 1,2 m de ancho y casi 1 m de profundo, y constaba de una serie de tanques en plástico transparente conectados por tubos, todos montados en un tablero de madera.\n\nEn este modelo, cada tanque representa aspectos de la economía nacional mientras que el flujo del dinero alrededor de la economía es ilustrado por agua coloreada. En la parte superior del tablero se sitúa un tanque grande que representa los recursos disponibles, el presupuesto. El agua (representando el dinero) fluye del primer tanque a los otros tanques, representando en qué se gasta el dinero. Por ejemplo, hay tanques para salud y educación. Si se quiere aumentar el gasto en salud se debe abrir un poco el grifo correspondiente, que drenará agua del presupuesto llevándola al tanque de la salud. Esta agua regresará al tanque inicial bombeada a través de otros tanques que representan los impuestos, por ejemplo.\n\nLos ahorros reducen los fondos disponibles para el consumo, y los ingresos por inversiones aumentan aquellos fondos.\n\nEl computador lo demostró, drenando agua (ahorros) a la corriente de gastos y inyectando agua (ingresos de inversión) a la corriente. Cuando el flujo de ahorros supera el flujo de inversión, el nivel de agua en los ahorros y tanque de inversión (el tanque del superávit) aumentaría para reflejar el equilibrio acumulado. Cuando el flujo de inversión supera el flujo de ahorros por cualquier lapso, el tanque del superávit se vaciaría. Las importaciones y las exportaciones están representadas por el agua que sale y entra al modelo. El flujo real del agua era automáticamente controlado a través de una serie de flotadores, contrapesos, electrodos, y cordones. Cuando el nivel de agua haya llegado a un nivel en el tanque, las bombas y los desagües serían activados. Para su sorpresa, Phillips y su colega Walter Newlyn encontraron que el computador podría ser calibrado a una exactitud del 2%.\n\nEl flujo del agua entre los tanques estuvo determinada por principios económicos y las adaptaciones de varios parámetros. Diferentes parámetros económicos, como los impuestos y la tendencia a la inversión, podría ser introducidos por poner las válvulas que controlan el flujo de agua en el computador. Los usuarios podrían experimentar con encuadres diferentes y notar el efecto en el modelo. La habilidad del computador para interactuar sutilmente lo hace una excelente herramienta. Cuando un conjunto de parámetros puestos resultan en una economía viable, el modelo estabilizaría y los resultados podrían verse a escala. Lo que se obtenía se enviaba a un plotter rudimentario. El computador fue diseñado para ser utilizado como ayuda didáctica pero también como un simulador económico eficaz.1\u200B Cuando el computador fue creado, el acceso a ordenadores digitales electrónicos capaces de llevar a cabo estas simulaciones estaban restringidos a ser usados por existían o estaban restringidos al gobierno para el uso militar, tampoco tenían maneras sencillas en sus pantallas, ni tampoco podían calcular complejidades. Observar el MONIAC funcionando, ayudó a que los estudiantes vieran los procesos en la economía nacional. El señor Phillips rebuscó una variedad de materiales para crear su prototipo de computador, incluyendo bits y piezas de sobra de la guerra, como partes de viejos bombarderos Lancaster. El primer MONIAC fue creado en el garaje de su arrendataria en Croydon con un coste de £400 (equivalente a £14,000 ). El primero demostró el computador a un número de economistas reconocidos en el LSE en 1949, el cuál fue muy bien recibido y luego recibió una oferta académica en el LSE.\n\nUbicaciones actuales\nSe supone que hay de doce a catorce máquinas en el mundo.\n\nEl prototipo estuvo dado al Departamento de Economía en la Universidad de Leeds, donde esta actualmente en exposición en la recepción de la escuela Empresarial de la universidad. Las copias se fueron a tres otras universidades británicas.\nLos otros ordenadores se fueron a Harvard,2\u200B Roosevelt y a la Universidad de Melbourne en Australia. La Compañía de Motor del Ford y el Banco Central de Guatemala posiblemente han comprado los CAINMs.\nUno estaría en la Universidad de Estambul, en la Facultad De Economía y está a disposición.\nEl del LSE fue dado al Museo de Ciencia en Londres y, después fue colocado en exhibición pública en las galerías de matemática del museo.3\u200B\nEl otro del LSE fue dado al Instituto de Nueva Zelanda de Investigación Económica en Wellington, Nueva Zelanda. Esta máquina forma parte de la Exposición de Nueva Zelanda en el Venice Biennale en 2003, modelando la economía de Nueva Zelanda. En 2007, esta máquina fue restaurada y colocado en exhibición permanente en el Banco de Reserva de Museo de Nueva Zelanda.4\u200B\nUn aparato que funciona (o Máquina de Phillips en el Reino Unido) puede ser encontrado en la Facultad de Economía en Universidad de Cambridge en el Reino Unido. Esta máquina fue restaurada por Allan McRobie del Departamento de Ingeniería Universitaria de Cambridge, que da una demostración anual a los estudiantes.\nUn replica del computador en el banco central de Guatemala fue creado para una exposición del 2005, titulado \"Economías Tropicales\" en el Instituto de la Universidad de California de las Artes de Wattis en San Francisco.5\u200B\nOtro en La Universidad de Melbourne, Australia, en una exhibición permanente en el lobby de la Biblioteca de Giblin Eunson (1er piso o planta baja, en el edificio de negocios y economía, 111 Barry st, Carlton, Melbourne). La facultad ha enviado una invitación a cualquiera interesado en restaurar la máquina a capacidad funcional.\nLa Universidad Erasmus de Rotterdam (EUR) tuvo un CAINM desde el 1953. Sería un regalo de la Ciudad de Rotterdam para su aniversario 40. Está localizado en el edificio Theil.\nUno está ubicado en la Universidad de Clausthal, en la facultad de ciencias económicas y administrativas, en el segundo edificio.\nCultura popular\nEl Terry Pratchett novel Ganando dinero contiene un dispositivo similar como punto de parcela importante. Aun así, después del dispositivo es plenamente perfeccionado, mágicamente deviene directamente enlazado a la economía que estaba pretendido para simular, con el resultado que la máquina puede no entonces ser ajustado sin causar un cambio en la economía real (en parodic parecido a Goodhart Ley).\n"];


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
