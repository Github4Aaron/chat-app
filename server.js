var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

mongoose.Promise = Promise
var dburl = 'mongodb://user:dbpassword1@ds147684.mlab.com:47684/node-chat-app'

var Message = mongoose.model('Message', {
  name: String,
  message: String
})



app.get('/messages', (req, res) =>{
  Message.find({}, (err, messages)=> {
    res.send(messages)
  })
}) 

app.post('/messages', (req, res) =>{
  var message = new Message(req.body)

  message.save().then(()=> {
    Message.findOne({message: 'badword'}, (err, censored) => {
      if (censored) {
        console.log('censored words found', censored)
        Message.remove({_id: censored.id}, (err) =>{
          console.log('removed censored message')
        })
      }
    })
    io.emit('message', req.body)
    res.sendStatus(200)
  }).catch((err) => {
    res.sendStatus(500)
    return console.error(err)
  }) 
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

mongoose.connect(dburl, (err)=>{
  console.log('mongodb connection', err)
})

var server = http.listen(3000, () => {
  console.log('The server is listening on port', server.address().port)
})
