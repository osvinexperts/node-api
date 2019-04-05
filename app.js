var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const secret = 'This is my secret',
jwt = require('jsonwebtoken')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/uploads/:filename', function(req, res){
    var file = __dirname + '/uploads/' + req.params.filename;
    res.download(file); // Set disposition and send it.
});

require('./routes/authRoutes')(app)

app.use((req, res, next) => {
  header_auth_token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || header_auth_token;
  if (token) {
      jwt.verify(token, secret, (err, decoded) => {
          if (err) {
              return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
          } else {
              req.decoded = decoded;
              next();
          }
      });
  } else {
      return res.status(403).send({
          success: false,
          message: 'Not Authorized'
      });

  }
})

var importFileRouter = require('./routes/fileimport')
app.use('/files/import', importFileRouter)
require('./routes/index')(app)

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});


module.exports = app;
