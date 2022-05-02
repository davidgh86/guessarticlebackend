const { SHA3 } = require('sha3');

const keyWord = "redactle"

function getDateString() {
    let date = new Date()
  
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
  
    if (day < 10){
      day = `0${day}`
    }
  
    if (month < 10){
      month = `0${month}`
    }
  
    return `${year}${month}${day}`
}
  
function getTodayPassword(){
    const hash = new SHA3(512);
    hash.update(`${getDateString()}${keyWord}`)
    return hash.digest('hex').toString()
}

const middlewares = {
    auth: function (req, res, next) {
        let bearer = req.header('Authorization')
        if (!bearer) {
            res.status(401).send();
            return
        }
        let tokenItems = bearer.split(" ")
        if (tokenItems.length!=2 || tokenItems[0].toLowerCase()!=="bearer"){
            res.status(401).send();
            return
        }
    
        let token = tokenItems[1];
        if (token !== getTodayPassword()){
            res.status(401).send();
            return
        }
        next()
    }
}


module.exports = middlewares;
