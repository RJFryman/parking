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
  app.post('/logout', d, users.logout);
  app.post('/records', d, records.create);
  app.get('/records', d, records.index);
  app.get('/find', d, records.find);
  app.get('/records/new', d, records.new);
  app.get('/records/:id', d, records.show);
  app.get('/daylot', d, records.total);
  app.get('/lot/:name', d, records.lotShow);
  app.get('/date/:date', d, records.dateShow);
  app.get('/car', d, records.car);
  app.get('/car/find', d, records.findCar);
  app.del('/records/:id', d, records.destroy);
  console.log('Routes Loaded');
  fn();
}

