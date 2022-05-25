var express = require('express');
var router = express.Router();
var cron = require('node-cron');

var authMiddleware = require('../middleware').auth;

const separators = new Set(["\n", "(", ")", " ", ",", ".", ";", ":", "_", "-", "“", "”", "&", "$", "€", "@", "ª", "º", "!", "¡", "?", "¿", "}", "{", "}", "[", "]", "<", ">", "#", "~", "%", "¬", "/", "\\", "=", "\"", "*", "^", "<", "/", ">"]);

const queue = []

let title = ["Aguilar de Campoo"];

let text = ["Aguilar de Campoo es una localidad y municipio en la provincia de Palencia, dentro de la comunidad autónoma de Castilla y León (España).\n\nTiene una superficie de 236,54 km² y cuenta con una población de 6842 habitantes (INE 2018) y una densidad de 29,50 hab/km². El municipio es conocido por su industria galletera, la más importante del país, y porque en él se encuentra el embalse de Aguilar.\n\nEs una de las localidades del Camino de Santiago del Norte: Ruta del Besaya. Allí se cruza con el trazado del Camino Olvidado de Santiago. Desde 2017, el municipio se encuentra incluido en el Geoparque Las Loras, el primer geoparque de la Unesco en Castilla y León.\n\nToponimia\nEl topónimo Campoo proviene del topónimo latino Campodium. Campoo es el territorio que ocupan los municipios de Hermandad de Campoo de Suso, Campoo de Enmedio y Campoo de Yuso y Reinosa, en la Comunidad Autónoma de Cantabria. La razón por la que Aguilar incluye en su nombre el topónimo Campoo a pesar de no encontrarse en el territorio tradicional del valle de Campoo se debe a que durante la Edad Media la Merindad de Aguilar de Campoo incluyó en su territorio a las Hermandades del Valle cántabro de Campoo anteriormente mencionadas, que después se desgajarían de esta formando la Merindad menor de Campoo.2\u200B Por otro lado el término Aguilar puede hacer referencia a la antigua colonia de águilas presentes en la zona, o a la agreste configuración rocosa de la montaña en que se alza su castillo defensivo.\n\nGeografía\n\nFragmento de la hoja 133 del Mapa Topográfico Nacional de España de 2015 en el que se representa Aguilar de Campoo\nEstá a una distancia de 99 km de Palencia, capital de la provincia, a 80 km de Burgos y a 102 km de Santander (Cantabria). Se encuentra en la ribera del río Pisuerga, en la comarca de la Montaña Palentina e inmersa en el territorio histórico de la Merindad de Campoo.\n\nMapa del término municipal\n\nMunicipios limítrofes\nBarruelo de Santullán\nBerzosilla\nBrañosera\nPomar de Valdivia\nSalinas de Pisuerga\nValdeolea\nValderredible\n\nHistoria\n\nLugar poblado por cántabros, romanos y visigodos fue baluarte en la dominación árabe (de esta época solo quedan los nombres de algunos pueblos: Cordovilla, Zalima...) y villa de gran importancia en la Edad Media.\n\nEl 14 de mayo de 1255, siendo rey Alfonso X el Sabio y estando este en Aguilar, la declaró Villa Realenga y señaló sus términos. Este fue el Primer Fuero Real de Castilla (después sería Sahagún), que actualmente forma parte de los fondos del museo de la Hispanic Society of America (catálogo de 1953). La villa permanecería con este privilegio hasta 1332.\n\nFue, desde entonces, cabecera de la Meryndat de Aguylar de Canpo, una división administrativa de la Corona de Castilla, vigente durante la Edad Media, cuya descripción figura en el libro Becerro de las Behetrías de Castilla5\u200B redactado por las Cortes de Valladolid de 1351, cuando el estamento de los hidalgos solicitó al rey Pedro I la desaparición de las behetrías mediante su conversión en tierras solariegas. Esta merindad era una de las más extensas y pobladas de Castilla y contaba con 262 localidades, actualmente repartidas entre las provincias de Palencia, Cantabria y Burgos. Su alfoz contaba con 34 aldeas.6\u200B\n\nPedro de Aguilar, hijo ilegítimo del rey Alfonso XI el Justiciero y de Leonor de Guzmán, fue titular del señorío de Aguilar entre 1332 y 1338, y de los términos de Liébana y La Pernía, pero habiendo fallecido este infante siendo aún niño y sin descendencia, el Señorío de Aguilar de Campoo fue vuelto a conceder por el mismo rey Alfonso XI a otro de sus hijos, el infante Tello de Castilla el 10 de febrero de 1339, que fue Conde de Vizcaya, Señor de Aguilar de Campoo, de Castañeda y de Lara, y fundador de las villas de Marquina, Elorrio, y Guernica. Conservó este príncipe el Señorío de Aguilar de Campoo hasta su muerte en 1370, año en que la soberanía sobre el señorío de Vizcaya fue asumida definitivamente por los reyes de Castilla. Sin embargo, tanto el Señorío de Aguilar de Campoo como el de Castañeda fueron confirmados por los sucesivos reyes de Castilla a los descendientes de Tello, siendo por tanto dicho infante el progenitor de la casa de los marqueses de Aguilar de Campoo.\n\nEn 1480, los Reyes Católicos instituyeron el marquesado de Aguilar de Campoo (uno de los más antiguos marquesados de España) en la persona del tataranieto del infante Don Tello, Don Garci V Fernández Manrique de Lara, I Marqués de Aguilar de Campoo, III Conde de Castañeda y de Buelna y Chanciller Mayor de Castilla. Desde entonces, la historia de Aguilar discurre a vida y obra de sus marqueses hasta la desaparición del Antiguo Régimen en el siglo xix.\n\nEl título de marqués de Aguilar de Campoo fue distinguido en 1520 con la dignidad de Grande de España, la más alta distinción nobiliaria europea, que otorga a sus titulares la condición de primos del rey y el tratamiento de Excelencia así como el derecho a permanecer con la cabeza cubierta en presencia del monarca.\n\nEn octubre de 1517 permaneció por primera vez en Aguilar de Campoo, en el Palacio de los Marqueses, el rey Carlos I y futuro Emperador Carlos V y su hermana Doña Leonor, donde fueron recibidos y agasajados por la nobleza en su primer viaje a España para tomar posesión de la herencia de sus abuelos los Reyes Católicos.\n\nTras ser elegido Emperador, Carlos V desembarcó en Laredo (Cantabria) a su retorno de Alemania y se quedó por segunda vez en Aguilar de Campoo en julio de 1522. Durante esta estancia visitó el sepulcro de Bernardo del Carpio, valiente y esforzado caballero, vencedor de la batalla de Roncesvalles, que estaba situado junto al Monasterio de Santa María la Real, llevándose su espada, la cual se encuentra actualmente en la Real Armería de Madrid.\n\nEl 10 de agosto de 1519 partió de Sevilla la expedición de Magallanes, junto a Juan Sebastián Elcano y 236 marineros para dar la primera vuelta al mundo. Uno de los 30 supervivientes que regresaron el 6 de septiembre de 1522 fue Juan Martín, natural de Aguilar de Campoo, a quien la Villa tiene dedicada una de sus plazas.\n\nLa mejor fuente para conocer Aguilar en el siglo xviii es el Catastro del Marqués de la Ensenada. En esa época su principal riqueza la constituían la agricultura y la industria harinera, con siete molinos, de los que cuatro pertenecían a Santa María La Real, uno al capitán Malla, uno al Turruntero y el llamado posteriormente de la Fábrica de Harinas que pertenecía a la marquesa de Aguilar, y varios batanes para pisar paño y ropa.\n\nA la caída del Antiguo Régimen la localidad se constituyó en municipio constitucional, conocido entonces como Aguilar de Campó en el partido de Cervera de Pisuerga,7\u200B que en el censo de 1842 contaba con 186 hogares y 967 vecinos.\n\nA principios del siglo xix, Aguilar de Campoo también sufrió las consecuencias de la invasión francesa, sobre todo el Monasterio de Santa Clara, que fue quemado por las tropas napoleónicas.\n\nEn 1833 con la división provincial de Javier de Burgos, bajo Isabel II, cambió la situación provincial del municipio, que hasta la fecha pertenecía a la división provincial de Cantabria y se añade a la provincia de Palencia.\n\nEn 1921, Miguel de Unamuno visitó Aguilar y escribió un artículo sobre la villa que incluiría en su libro Andanzas y visiones españolas.8\u200B\n\nEntre los años 1950 y 1960 se construyó el embalse de Aguilar, inaugurándose en 1963.\n\nComo consecuencia del despoblamiento del medio rural, en los años 1970 anexionaron9\u200B los siguientes siete municipios:\n\nBarrio de San Pedro,\nCorvio,\nCozuelos de Ojeda,\nNestar,\nValdegama,\nValoria de Aguilar\nVillanueva de Henares.\nDemografía\n\nEconomía\n\nEn la historia más reciente cabe destacar la industria galletera en la villa. En la década de 1960 hubo en Aguilar cinco fábricas de galletas: Gullón, Ruvil, Fontaneda, Tefe y Fontibre, hasta el punto de que 9 de cada 10 galletas que se consumían en España salían de las galleteras aguilarenses. En la actualidad existen dos fábricas galleteras en la villa: Galletas Gullón 1, Galletas Gullón 2.\n\nEn los últimos años se han puesto en marcha dos nuevas fábricas de alimentación que se unen a las ya existentes: una perteneciente al Grupo Siro - donde se elabora mayoritariamente pan de molde para una conocida cadena de supermercados, y otra perteneciente a Gullón - llamada VIDA - donde se elaboran productos dietéticos y saludables.\n\nCabe reseñar las importantes revueltas en la primavera de 2003 cuando la multinacional United Biscuits, que había comprado la fábrica de Galletas Fontaneda cinco años antes, quiso cerrarla dejando sin trabajo a cerca de 300 personas (destacar que en el ERE de los años 90 ya hubo 300 despidos y que en la fábrica llegó a haber hasta 1000 obreros). Los trabajadores de Fontaneda recibieron el apoyo de toda la provincia, y su símbolo de una galleta en la que se leía \"Fontaneda es de Aguilar\" (la palabra AGUILAR estaba troquelada en todas las galletas María) recorrió toda España.\n\nEsta actividad, que comenzó a partir de los reposteros locales que las elaboraban con el trigo de Castilla y el azúcar y otros productos de las antiguas colonias españolas, importados por el puerto de Santander, sigue constituyendo una de las principales industrias de Aguilar de Campoo.\n\nAguilar siempre ha estado muy vinculada a la industria alimentaria, pero también cabe destacar una empresa dedicada a la industria química siendo de las más longevas de la villa. Colas loga y Adhesivos permanece instalada desde mediados de los años 1950, originariamente dedicada a la fabricación de jabones.\n\nEl municipio alberga también un importante embalse, el embalse de Aguilar, que ocupa una superficie próxima a las 1650 hectáreas y tiene una capacidad de 249 millones de metros cúbicos de agua. Este embalse permite la producción de energía eléctrica y la práctica de deportes náuticos.\n\nEl turismo cultural y rural se encuentra actualmente en una fase de gran expansión en este municipio y su comarca, como el FICA, Festival Internacional de Cortometrajes de Aguilar, que lleva ya más de veinte años llevándose a cabo por iniciativa del Ayuntamiento, o el veterano Encuentro Internacional de Artistas Callejeros (ARCA) que en agosto de 2009 celebró su quincuagésima edición.\n\nEn el municipio se encuentran las siguientes entidades locales menores,13\u200B a saber:\n\nBarrio de San Pedro\nBarrio de Santa María\nCabria\nCanduela\nCordovilla de Aguilar\nCorvio\nFoldada\nLomilla\nMatalbaniega\nMatamorisca\nMave\nMenaza\nNestar\nOlleros de Pisuerga\nPozancos\nPuentetoma\nVallespinoso de Aguilar\nValoria de Aguilar\nVillacibio\nVillanueva de Henares\nVillavega de Aguilar\n\n\nPatrimonio\n\nLa villa de Aguilar de Campoo posee un importante patrimonio artístico y cultural en el que destacan muy notables edificaciones de carácter religioso, civil y militar de estilos románico, gótico y renacentista, así como las razonablemente bien conservadas ruinas de elementos defensivos y militares. La villa de Aguilar de Campoo fue declarada Conjunto Histórico-Artístico el 20 de enero de 1966.14\u200BEntre sus edificaciones destacan:\n\nMonasterio de Santa María la Real\nArtículo principal: Monasterio de Santa María la Real (Aguilar de Campoo)\nAntiguo cenobio de la orden Premonstratense, que acoge la sede de la Fundación homónima, el Centro de Estudios del Románico y el Museo del Territorio y del Románico.15\u200B\nColegiata de San Miguel\nArtículo principal: Colegiata de San Miguel (Aguilar de Campoo)\nCastillo medieval\nArtículo principal: Castillo de Aguilar de Campoo\n\nCastillo de Aguilar de Campoo\nMurallas medievales\nSe conservan aún seis de la siete puertas que en origen tuvo la villa. Estas son la Puerta de Reinosa (conserva una lápida hebrea),16\u200B la de la Tobalina, la de Barbacana o Paseo Real, la del Portazgo, la de la Cascajera y la de San Roque.\nPlaza Mayor\nAdemás de la Colegiata, se encuentran varios palacios, entre ellos el de los Marqueses de Aguilar (de estilo barroco), el de los Fontaneda, casonas de estilo señorial cántabro (con amplias galerías mirando hacia el sur), la casa de los Siete Linajes, etc.\nPalacio de los Marqueses de Aguilar de Campoo\nSe conserva una de sus alas.\nIglesia de Santa Cecilia\nArtículo principal: Iglesia de Santa Cecilia (Aguilar de Campoo)\n\nIglesia de Santa Cecilia\nMonumento Nacional.17\u200B\nMonasterio de Santa Clara\nMonumento Nacional.18\u200B\nIglesia de Santa Clara\nPuentes sobre el río Pisuerga\nCabe destacar el Puente Mayor y el puente del Portazgo, ambos de origen medieval; el puente del Molino Turruntero; el puente de las Tenerías; y el puente de la Teja. Además de otros de moderna construcción como la bonita pasarela de madera que conecta el Paseo del Soto y el Polideportivo con el Paseo del Loco montada a finales de diciembre de 2008 sobre el cuérnago del Pisuerga.\n\nPuente Mayor sobre el río Pisuerga\n\nPuente del Portazgo sobre río Pisuerga\n\nPasarela del Paseo del Loco\nPatrimonio geológico\nLa UNESCO ha declarado al espacio geográfico de Las Loras –ubicado en las provincias de Palencia y Burgos– nuevo geoparque, tras la reunión de su Comité Ejecutivo celebrado el 5 de mayo de 2017.\n\nDe esta manera, el espacio de Las Loras se convierte en el primer geoparque de Castilla y León –y el 11º de toda España– y entra a formar parte de la Red Mundial de la UNESCO.19\u200B\n\nDeportes\nEl equipo de fútbol del municipio, el C. D. Aguilar, milita la temporada 2012/13 en el Grupo VIII de la Tercera División de España.\n\n\n\n\n"];


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
