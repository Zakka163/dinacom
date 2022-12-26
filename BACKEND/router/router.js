const express = require('express');
const controller = require('../controller/controller.js');
const route = express.Router();
const middleware = require('../helper/middleware.js')


//route.post('/tes',middleware,controller.tes);

route.post('/user/register',controller.register)
route.post('/user/login',controller.login)
route.get('/logout',middleware.autentikasi,controller.logout)


/* wallet */

route.get('/user/wallet',middleware.autentikasi,controller.getWallet)
route.post('/user/walletchild',middleware.autentikasi,controller.createWallet)
route.post('/user/wallet/transaction',middleware.autentikasi,controller.transaction)




/*  testing */
route.post('/tes/register',controller.tesregister)
route.post('/tes/login',controller.teslogin)
route.get('/teslogout',middleware.tesautentikasi,controller.teslogout)
route.get('/tes',middleware.autentikasi,controller.tes)

//authentication
/*
route.get('/user',middleware,controller.getUser)


route.post('/todo',middleware,controller.addTodo)
route.get('/todo',middleware,controller.getTodo)
route.get('/todo/:id',middleware,controller.getTodoId)
route.put('/todo/:id',middleware,controller.updateTodo)
route.delete('/todo/:id',middleware,controller.deleteTodo)

*/
//route.get('/serving',middleware,controller.serving)



module.exports = route;