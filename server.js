var express = require('express')
var app = express()

app.use(express.static(__dirname))

var messages = [
  {name: 'Aaron', message: 'hey from Aaron'},
  {name: 'Susan', message: 'hey from Susan'},
]

app.get('/messages', (req, res) =>{
  res.send(messages)
}) 
var server = app.listen(3000, () => {
  console.log('The server is listening on port', server.address().port)
})

