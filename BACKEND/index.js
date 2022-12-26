const express = require('express');
const router = require('./router/router.js')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express();

app.use(express.json())
//app.use(fileUpload())
app.use(cors())
app.use(cookieParser());

//app.use(express.static("public"))
//app.use(express.static('foto'))
app.use(router);




const port = 5000;
app.listen(port,()=>{
    console.log(`running in localhost:${port}`);
});