'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var users = require('../routes/users');
  var records = require('../routes/records');

  app.get('/', d, home.index);
  app.get('/register', d, users.fresh);
  app.post('/register', d, users.create);
  app.get('/login', d, users.auth);
  app.post('/login', d, users.login);
  app.get('/logout', d, users.logout);
  app.post('/records', d, records.create);
  app.get('/records', d, records.index);
  app.get('/find', d, records.find);
  app.get('/records/new', d, records.new);
  app.get('/records/:id', d, records.show);
  app.del('/records/:id', d, records.destory);
  app.put('/records/:id', d, records.update);
  console.log('Routes Loaded');
  fn();
}

