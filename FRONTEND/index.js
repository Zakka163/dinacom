//let data = require('./data.js')
const localhost = 5000
let token = ""
let pesan = "lama"




const login = (event)=>{


    
    
    (async(Email,Password)=>{
        
        notifn.innerText = ""
        notif.appendChild(notifn)
        let url = `http://localhost:${localhost}/tes/login`;
        //let data =
        //document.cookie = "token=kkk" 
        let res = await fetch(url, {
            credentials: "same-origin",
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
                 'token':""
                
                 },
            body: JSON.stringify({ email:Email,password:Password})
        });
        
        let response = await res.json()
        console.log(response)
        if (response.status == 'gagal') {
            notifn.innerText = response.msg
            notif.appendChild(notifn)
            //alert(response.msg,"succes login")
        
        }else{
            data.push(response.cookie)
            alert(response.msg)
            console.log(data)
            window.location.href="./index.html"
        }

            
        }
       

            
    )(email.querySelector("input").value,password.querySelector("input").value);
    
    //console.log(email.querySelector("input").value,password.querySelector("input").value)
    //login()
    //document.location.reload()
    event.preventDefault();

    };



const register = (event)=>{
    (async(Name,Email,Password)=>{
        if (Name==""||Email==""||Password=="") {
            notifn.innerText = "value kosong"
            notif.appendChild(notifn)
            
        } else {
            let url = `http://localhost:${localhost}/tes/register`;
        //let data = 
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:Name,email:Email,password:Password})
        });
        let response = await res.json()
        console.log(response.body,response)
        }
        
    })(name.querySelector("input").value,email.querySelector("input").value,password.querySelector("input").value);
        
    event.preventDefault();
};


/*(async()=>{
        let url = `http://localhost:5000/tes`;
        //let data = 
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
            );
        let data = await res.json()
        console.log(data);await document.write(data)        
    })();
/*
const axios = require('axios');
const fetch = require('fetch');
let halo="ini dom"


async function login(dataemail,datapasswword) {
    
    const config = {
        method: 'post',
        url: 'http://localhost:8000/user/login'
    }
    let payload = {email:dataemail,password:datapasswword}
    let res = await axios.post('http://localhost:9000/user/login', payload);
    
    //let res = await axios(config,payload)
    console.log(res)
    return res.headers['set-cookie'];
}/*
async function register(Name,Email,Password) {
    /*
    const config = {
        method: 'post',
        url: 'http://localhost:8000/user/login'
    }
    let payload = {name:Name,email:Email,password:Password}
    let res = await axios.post('http://localhost:9000/user/register', payload);
    
    //let res = await axios(config,payload)

    return res.headers['set-cookie'];
}
async function logout(){
    //let payload = {name:Name,email:Email,password:Password}
    let res = await axios.get('http://localhost:9000/logout');
    return res.data
}

//login("mzakka2gmail.com","12345")
//const data=document.getElementById("register")


*/
//register();
/*
function login(Email,Password){
      return fetch('http://localhost:8000/user/login', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:Email,password:Password}),
        })
}



login("mzakka2gmail.com","12345")  
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
 */
/*
async function login(Email,Password) {

        let url = 'http://localhost:9000/user/login';
        //let data = 
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:Email,password:Password})
        });

       console.log(res.data)
    }
*/

