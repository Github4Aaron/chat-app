var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var messages = [
  {name: 'Aaron', message: 'hey from Aaron'},
  {name: 'Susan', message: 'hey from Susan'},
]

app.get('/messages', (req, res) =>{
  res.send(messages)
}) 

app.post('/messages', (req, res) =>{
  messages.push(req.body)
  res.sendStatus(200)
}) 

var server = app.listen(3000, () => {
  console.log('The server is listening on port', server.address().port)
})

