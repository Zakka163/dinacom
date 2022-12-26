const {modelUser,modelWalletParent,modelWalletChild} = require('../model/model.js');
const {QueryTypes} = require('sequelize');
const db = require('../config/db_config.js');
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt.js');


//
const saltRounds = 10;


//
class user{

    /* testing  */
    static async tes(req,res){
        try{
            //const {email,password} = req.body;
            const result = await db.query(
                'SELECT * FROM users',
                {
                  type: QueryTypes.SELECT
                }
              );
            const result2 = await db.query(
                'SELECT * FROM walletParents',
                {
                  type: QueryTypes.SELECT
                }
              );
            
            res.json({status:"succes",user:result,wallet:result2})
        }catch(r){

        }
    }
    static async teslogin(req,res){
        try {
            console.log(req.headers.token)
            if (req.headers.token) {
                //
                return res.json({status:"gagal",msg:"user sudah login"})
            }
            const {email,password} = req.body;
            const result = await db.query(
                'SELECT * FROM users WHERE email = :email',
                {
                  replacements: {email : email},
                  type: QueryTypes.SELECT
                }
              );
            //console.log(result.length)
            if(result.length != 0){
                const match = await bcrypt.compare(password,result[0].password);
                
                if(match){
                    console.log(result[0],match)
                    const tokenjwt = await jwt.generate(result[0]);
                    //console.log(tokenjwt)

                    res.cookie('token',tokenjwt,{
                        maxAge: 60000*3600
                    });
                    //
                    res.json({status:"succes",msg:"Login succes",cookie:tokenjwt,data:result[0]});
                }else{
                    //
                    return res.json({status:"gagal",msg:"password salah"});
                }
              }else{
                //
                return res.json({status:"gagal",msg:"email tidak terdaftar"});
              }
        } catch (error) {
            //
            res.json({status:"gagal",msg:"error",error:error});
        }
    }
    static async tesregister(req,res){
        try {
            const {name,password,email} = req.body;
            //if (password != confirm_password) return res.json({msg:"confirm password berbeda"});
            const result = await db.query(
                'SELECT * FROM users WHERE email = :Email',
                {
                  replacements: {Email : email},
                  type: QueryTypes.SELECT
                }
              );
            //
            if (result.length > 0) return res.json({status:"gagal",msg:"email sudah terdaftar"});

            
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                if (err) {
                    res.json({status:"gagal",msg:"register gagal",error:err});
                }else{
                    await modelUser.create({
                        name:name,
                        password:hash,
                        email:email});
                    res.json({status:"succes",msg:"register succes"});
                }
            });
        } catch (error) {
            res.json({status:"gagal",msg:"error",error:error});
        }
    }
    static teslogout(req,res){
        if (req.headers.token) {
             req.headers.token =""
             console.log(req.headers.token)
             
             res.json({status:"succes",msg:"logout succes"});
        }else{
            res.json({status:"gagal logout",msg:"belum login"});
        }
    }


    ///
    static async login(req,res){
        try {
            console.log(req.headers)
            if (req.cookies.token) {
                //
                return res.json({status:"gagal",msg:"user sudah login"})
            }
            const {email,password} = req.body;
            const result = await db.query(
                'SELECT * FROM users WHERE email = :email',
                {
                  replacements: {email : email},
                  type: QueryTypes.SELECT
                }
              );
            //console.log(result.length)
            if(result.length != 0){
                const match = await bcrypt.compare(password,result[0].password);
                
                if(match){
                    console.log(result[0],match)
                    const tokenjwt = await jwt.generate(result[0]);
                    //console.log(tokenjwt)
                    res.cookie('token',tokenjwt,{
                        maxAge: 60000*3600
                    });
                    //
                    res.json({status:"succes",msg:"Login succes",cookie:tokenjwt,data:result[0]});
                }else{
                    //
                    return res.json({status:"gagal",msg:"password salah"});
                }
              }else{
                //
                return res.json({status:"gagal",msg:"email tidak terdaftar"});
              }
        } catch (error) {
            //
            res.json({status:"gagal",msg:"error",error:error});
        }
    }
    static async register(req,res){
        try {
            const {name,password,email} = req.body;
            //if (password != confirm_password) return res.json({msg:"confirm password berbeda"});
            const result = await db.query(
                'SELECT * FROM users WHERE email = :Email',
                {
                  replacements: {Email : email},
                  type: QueryTypes.SELECT
                }
              );
            //
            if (result.length > 0) return res.json({status:"gagal",msg:"email sudah terdaftar"});

            
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                if (err) {
                    res.json({status:"gagal",msg:"register gagal",error:err});
                }else{
                    await modelUser.create({
                        name:name,
                        password:hash,
                        email:email});
                    await modelWalletParent.create({
                        saldo:0,
                        nameWallet:name
                        });
                    res.json({status:"succes",msg:"register succes"});
                }
            });
        } catch (error) {
            res.json({status:"gagal",msg:"error",error:error});
        }
    }
    static logout(req,res){
        if (req.cookies.token) {
             res.clearCookie("token")
             console.log(
                req.cookies,
                req.params,
                req.query)
             
             res.json({status:"succes",msg:"logout succes"});
        }else{
            res.json({status:"gagal logout",msg:"belum login"});
        }
    }


    static async getWallet(req,res){
        try{
            const result = await db.query(
                'SELECT * FROM users JOIN walletParents ON (users.id = walletParents.id)WHERE walletParents.id = :id',
                {
                  replacements: {id : req.query.id},
                  type: QueryTypes.SELECT
                }
                
              );
            
            res.json({status:'succes',msg:'berhasil',data:result})
        }catch(err){
            res.json({status:'gagal',error:err})
        }
    }
    static async createWallet(req,res){
        try{
            await modelWalletChild.create({
                idUser:req.query.id,
                idWallet:req.query.id,
                saldo:req.body.saldo,
                nameWallet:req.body.namewallet
            })
            res.json({msg:'succes create wallet'})
        }catch(err){
            res.json({msg:'failed to create wallet'})
        }
    }
    static async transaction(req,res){
        try{
            const {wallet,option,money,notes}=req.body
            if (option=="masuk") {
                const result = await db.query(
                    `UPDATE ${wallet} SET saldo = saldo + :money WHERE idWallet=:id`,
                {
                  replacements: {money:money,id : req.query.id},
                  type: QueryTypes.UPDATE
                }
                
              );
            }else if(option=="keluar"){
                const result = await db.query(
                    'UPDATE :wallet SET saldo = saldo - :money WHERE idWallet=:id',
                {
                  replacements: {wallet:wallet,money:money,id : req.query.id},
                  type: QueryTypes.UPDATE
                }
                
              );
            }
            //await transaction.create({ })
            res.json({msg:'succes create transaction'})
        }catch(err){
            res.json({msg:'failed to create transaction'})
        }
    }
}


class pemasukan{

}
class pengeluaran{

}
module.exports = user;