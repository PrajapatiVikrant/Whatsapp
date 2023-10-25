const express = require('express')
require('./mongodbs')
 const myschema = require('./schema');
const path = require('path')
const router = express.Router();
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const staticpath = path.join(__dirname,'./public')
app.use(express.static(staticpath));
 router.post('/',async (req,res)=>{
    const Name = req.body.name;
    const Password = req.body.password;
         try {
            const data =   await myschema.findOne({name:Name});
            console.log(data.password+"="+Password)
          if(Password == data.password)
          {
             console.log("logged in");
             res.sendFile('./public/chat.html',{root:__dirname});
          }
          else{
             console.log('Not logged in');
             res.sendFile('./public/signup.html',{root:__dirname});
          }
         } catch (error) {
            console.log('server error')
            res.send('create account');
         }  
 })
 
module.exports =router;