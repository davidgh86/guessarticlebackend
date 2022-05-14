var express = require('express');
var router = express.Router();
var cron = require('node-cron');

var authMiddleware = require('../middleware').auth;

const separators = new Set(["\n", "(", ")", " ", ",", ".", ";", ":", "_", "-", "“", "”", "&", "$", "€", "@", "ª", "º", "!", "¡", "?", "¿", "}", "{", "}", "[", "]", "<", ">", "#", "~", "%", "¬", "/", "\\", "=", "\"", "*", "^", "<", "/", ">"]);

const queue = []

let text = ["Aeropuerto Internacional de San Antonio\n\nEl Aeropuerto Internacional de San Antonio (en inglés, San Antonio International Airport) (IATA: SAT, OACI: KSAT, FAA LID: SAT) es un aeropuerto comercial en San Antonio, Texas, EUA. El aeropuerto tiene tres pistas de aterrizaje y cubre un área de 1,100 ha (2,600 acres). Y su elevación es 809 pies (247 m) sobre el nivel del mar y es un Aeropuerto Clase C.\n\nInformación\nEn el 2010, el tráfico aéreo de pasajeros creció un 2.5% respecto al 2009. El total de pasajeros fue de 8,034,720. El tráfico internacional de pasajeros disminuyó un 4.7% (136,970 pasajeros) debido al cese de los vuelos de Mexicana de Aviación durante 2010. Durante el año 2009, el aeropuerto manejó 7,831,267 pasajeros nacionales e internacionales.\n\nEn el año 2008 habían pasado por el aeropuerto 8,358,515 pasajeros, un 3.5% del total de 2007. El promedio es de 280 salidas y llegadas diarias en sus 27 puertas, que sirven a 16 aerolíneas que vuelan a 31 áreas metropolitanas, incluyendo la Ciudad de México.\n\nLos principales vuelos del aeropuerto son a Dallas, Houston, Las Vegas, Chicago, Baltimore, Nueva York, Los Ángeles, Phoenix, Atlanta y Washington, D.C.\n\nLa mayor aerolínea que opera en el aeropuerto es Southwest Airlines, transportando el 35.24% de pasajeros que opera el aeropuerto.\n\nDe febrero a septiembre de 2006, el aeropuerto era una ciudad foco para United Airlines que contaba con vuelos a 12 ciudades saliendo de este aeropuerto. Mexicana de Aviación celebró sus 50 años de servicio a este aeropuerto en septiembre de 2007, para suspender el servicio a San Antonio en agosto de 2010 cuando la compañía suspendió sus operaciones.\n\nEl aeropuerto actualmente está llevando a cabo un costoso proyecto de ampliación de varios millones de dólares que añadirá una nueva terminal y más posiciones de estacionamiento.\n\nEl vuelo más largo (por tiempo de vuelo y distancia) del Aeropuerto Internacional de San Antonio es hacia el Aeropuerto Internacional de Seattle-Tacoma, a una distancia de 1,776 millas (2,858 km), con una duración media de 4 horas 7 minutos. Este vuelo es operado por Alaska Airlines en Boeing 737-800.\n\nEl vuelo más corto desde San Antonio es a Houston al Aeropuerto Intercontinental George Bush, situado a una distancia de 191 millas (307 km), con una duración media de 50 minutos. Este vuelo es operado por United Airlines.\n\nHistoria\nEl Aeropuerto Internacional de San Antonio fue fundado en 1941, cuando la Ciudad de San Antonio compró 4.9 km² para construir el proyecto denominado Aeropuerto Municipal de San Antonio. Las necesidades de la Segunda Guerra Mundial hicieron que el aeropuerto fuera puesto al servicio del Gobierno de los Estados Unidos todavía sin terminar la construcción. Este aeropuerto fue la base militar para varios escuadrones de aviones que fueron enviados a combate en la Segunda Guerra Mundial, pero al final de la guerra el gobierno entregó el aeropuerto para su uso civil.\n\nLa antigua Terminal 2, comenzó a construirse en 1951 y fue terminada en 1953. Además de la nueva terminal, la torre de control de la FAA y un sistema de reclamo de equipajes se construyeron. Cuando las noticias de la Feria Mundial de 1968 llegaron a San Antonio, una nueva sala satélite con ocho puertas con pasarelas de acceso y zonas de espera se construyeron.\n\nEn 1975, la ciudad adoptó su primer Plan Maestro del Aeropuerto. Se incluyen planes para un nuevo estacionamiento con 1,300 lugares y una nueva terminal de 33,000 m² (360,000 pies²) (antes conocida como Terminal 1 que ahora se llama Terminal A). Una vez que la nueva terminal se completó en 1984, el aeropuerto paso de ocho puertas a 27 puertas. En 1986, la nueva torre de control de 67 m (221 pies) fue construida en una nueva ubicación.\n\nEn 1994, un segundo plan maestro del aeropuerto fue desarrollado para que el aeropuerto entrara al siglo 21. Este plan incluye importantes actualizaciones para el aeropuerto. Se contemplan más espacios de estacionamiento con 3,000 nuevos lugares que se completaron en el 2007. Además, tiene planes para la mejora de acceso al aeropuerto, así como un mejor programa de concesiones. Dos nuevas terminales se han previsto para reemplazar la Terminal 2, para aumentar la capacidad del aeropuerto a 35 puertas.\n\nEl 9 de noviembre del 2010 vio el cierre de la Terminal 2 original, y la apertura de la nueva Terminal B. La Terminal 1 ha pasado a denominarse Terminal A. La eliminación de los encuentros en la antigua Terminal 2 se iniciaron en enero de 2011. La demolición final estructural de la Terminal 2 se realizó en mayo de 2011.\n\nSan Antonio cerró el final del siglo XX con más de 3.5 millones de pasajeros en embarques en 1999. Desde 1966, el aeropuerto ha atendido más de 80 millones de personas.\n\nAdministración\n\nEl Aeropuerto Internacional de San Antonio es propiedad de la ciudad de San Antonio. El director de la aviación es informado regularmente por miembros del Comité Asesor del aeropuerto. Estos consisten en las comunidades vecinas, los pilotos, la comunidad empresarial, los barrios, en la industria del taxi y los viajes y el turismo. Esta información es luego transmitida por el Director de Aviación del consejo de la ciudad.\n\nA partir del 21 de abril del 2009, Frank Miller, fue contratado como Director del Aeropuerto Internacional de San Antonio. El Sr. Miller obtuvo una Licenciatura en Administración de Empresas de la Universidad Luterana del Pacífico. Actualmente es el presidente de Consejo Internacional de Aeropuertos (ACI) - América del Norte, y su actual mandato finaliza en octubre de 2011. En el pasado, Miller ha trabajado como vicepresidente, dos veces en la Junta Directiva de la ACI. Actualmente es miembro de la ACI - Mundial de Junta de Gobierno. El Sr. Miller es expresidente de la Asociación Americana de Ejecutivos de Aeropuertos, Capítulo Sur-Oriental. Fue galardonado con la gerenacia comercial de la Región Sur de la FAA del Año en 2006.\n\nTerminales\nEl Aeropuerto Internacional de San Antonio tiene dos terminales con un total de 24 puertas con pasarelas de acceso a aeronaves. La terminal original de un piso (anteriormente Terminal 2) abrió sus puertas en 1953 con zonas de espera en planta baja y fue ampliada dos veces, una en 1959 con nuevas alas este y oeste y de nuevo en 1968 con una sala satélite de ocho puertas, que fue construida para atender a los visitantes a la Exposición Internacional de San Antonio. La Terminal 2 cerró el 9 de noviembre de 2010 cuando se abrió la nueva Terminal B y Terminal 2 comenzó a ser demolida en marzo de 2011, finalizando en enero de 2012. Una segunda terminal (anteriormente Terminal 1, ahora Terminal A) abrió sus puertas en 1984 con una sala de 16 puertas (puertas A1-A16). La Oficina de Aduanas y Protección Fronteriza de los Estados Unidos (FIS) se encuentra en la Terminal A. Las puertas A1-A2 y A10-A11 tienen acceso directo a la FIS. La Terminal A pronto comenzará un proyecto de actualización y modernización.\n\nTerminal A\nLa Terminal A (previamente Terminal 1) es la mayor de las dos con una sala de espera con 17 puertas en total. La mayoría de las aerolíneas dan servicio al aeropuerto a través de esta terminal. Junto con los transportistas nacionales, todas las compañías internacionales operan desde la Terminal A. El 18 de junio de 2014 se completó una renovación de $35.6 millones de dólares en la Terminal. Las mejoras más visibles para los pasajeros son nuevo piso de terrazo, áreas de comida rápida nuevas y la nueva señalización. A partir del 15 de octubre de 2014 todas las puertas en la Terminal A fueron renombradas en orden secuencial.3\u200BActualmente 8 aerolíneas operan desde la Terminal A, utilizando 15 de las 17 puertas.\n\n* Aeroméxico utiliza las puertas A7, A8.\n* Alaska Airlines utiliza la puerta A5.\n* Allegiant usa la puerta A8.\n* American usa las puertas A15 y A17.\n* Delta Airlines utiliza las puertas A2-A5.\n* Frontier usa la puerta A8.\n* Interjet y Volaris utilizan la puerta A6.\n* Southwest Airlines utiliza las puertas A9-A14\nLas puertas A1 y A16 son usadas la mayoría de las veces para vuelos chárter pero también como una reserva para vuelos de desbordamiento.\n\nTerminal B\nEl 9 de noviembre de 2010, el Aeropuerto Internacional de San Antonio anunció la apertura de la nueva Terminal B, que contiene 8 puertas (B1-B8). Corgan Associates, Inc. y 3D/International diseñaron la nueva terminal.4\u200B American Airlines y Continental Aerolíneas eran los dos operadores originales cuando la terminal abrió. United Airlines en ese momento se encontraba en la Terminal A. Una vez que la fusión entre United Airlines y Continental Airlines se completó, la nueva United consolidó todas las operaciones en la Terminal B. (el 1 de agosto de 2012) La Terminal es también el hogar de un salón United Club que se encuentra entre las puertas B3 y B5. American Airlines y United Airlines junto con sus filiales regionales son los únicos inquilinos de la Terminal. Actualmente se utilizan todas las puertas en la Terminal B. El USO del aeropuerto se encuentra en el nivel inferior de la terminal B, junto al reclamo de equipaje.\n\n* American Airlines utiliza las puertas B2, B4 y B6.\n* United Airlines utiliza las puertas B1, B3, B5, B7 y B8.\n\n"];

let title = ["Aeropuerto Internacional de San Antonio"]


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
