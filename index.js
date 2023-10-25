const express = require('express')
const path = require('path')
const app = express();
const http = require('http').createServer(app);
const staticPath = path.join(__dirname,'./public')
app.use(express.static(staticPath))
 require('./mongodbs')
 const myschema = require('./schema');
const login = require('./logincheck.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.sendFile('./public/loginform.html',{root:__dirname})
})
app.get('/signup',(req,res)=>{
    res.sendFile('./public/signup2.html',{root:__dirname})
})
app.post('/sign',async (req,res)=>{
    let data = new myschema(req.body);
    let result = await data.save();
    if(result.acknowledged)
    {
     console.log('data inserted')
    }
    else{
     console.log('Not insert')
    }
    console.log(result);
 res.sendFile('./public/chat.html',{root:__dirname})  
})
app.use('/mylogin',login)
const PORT = process.env.PORT||80;
http.listen(PORT,()=>{
    console.log('Listening on port ${PORT}')
})
const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})
// const io = require('socket.io')(8000)
// const users = {};
// io.on('connection', socket=>{
//     socket.on('new-user-joined', name=>{
//         console.log(name);
//         users[socket.id]= name;
//         
//     })
//     socket.on('send',message =>{
//         socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
//     })
// })