var express = require('express')
var { body, validationResult } = require('express-validator')
var path = require('path')
var session = require('express-session')
const { xss } = require('express-xss-sanitizer')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(session({
  secret: 'JHjdfh%jsk23j7$@52kjfdjkGD@F767&3t2rdald3943ncgyusud',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(xss())

require('./routes/register')(app, body, validationResult)
require('./routes/index')(app)
require('./routes/login')(app, body)
require('./routes/inbox')(app)
require('./routes/new')(app, body)
require('./routes/dbdump')(app)

app.use(function (req, res, next) {
  res.render('404')
})

module.exports = app
