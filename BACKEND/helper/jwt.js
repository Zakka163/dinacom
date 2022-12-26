const JWT = require('jsonwebtoken');
const privateKey = "dinacom";


class token{
    static generate(data){
        return new Promise((resolve,reject)=>{
            JWT.sign(data, privateKey, function(err, token) {
                if(err){
                    reject(err);
                }
                resolve(token); 
              });
        })
    }

    static verify(token){
        return new Promise((resolve,reject)=>{
            JWT.verify(token,privateKey, function(err, decoded) {
                if(err){reject(err);}
                resolve(decoded);
              });
        })
    }

}

module.exports = token;