const jwt = require('./jwt.js');



class middleware{
    static async autentikasi(req,res,next){
        try {
            if(req.cookies.token){
                const decode = await jwt.verify(req.cookies.token);
                
                if (decode == null) return res.json({status:"gagal",msg:"token salah"});
                req.query.id = decode.id;
                next();
            }else{
                return res.json({status:"gagal",msg:"user belum login"});
            }
        } catch (error) {
            res.clearCookie("token")
            return res.json({status:"gagal",msg:"error",err:error})
        }
    }
    static async verify(req,res,next){
        try {
            if(req.cookies.token){
                const decode = await jwt.verify(req.cookies.token);
                
                if (decode == null) return res.json({status:"gagal",msg:"token salah"});
                req.query.id = decode.id;
                next();
            }else{
                return res.json({status:"gagal",msg:"user belum login"});
            }
        } catch (error) {
            return res.json({status:"gagal",msg:"error",err:error})
        }
    }

    /* testing */

    static async tesautentikasi(req,res,next){
        try {
            console.log(req)
            if(req.headers.token){

                const decode = await jwt.verify(req.headers.token);
                
                if (decode == null) return res.json({status:"gagal",msg:"token salah"});
                console.log("succes jwt")
                req.query.id = decode.id;
                next();
            }else{
                return res.json({status:"gagal",msg:"user belum login"});
            }
        } catch (error) {
            return res.json({status:"gagal",msg:"error",err:error})
        }
    }
}


module.exports = middleware;