/* jshint expr:true */

'use strict';

process.env.DBNAME = 'parking-test';
var request = require('supertest');
var app = require('../../app/app');
//var expect = require('chai').expect;
var User, Record;
var u1,r1, cookie;

describe('Record', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      Record = require('../../app/models/record');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u1 = new User({username:'test', email:'test@nomail.com', password:'1234'});
      u1.register(function(){
        r1 = new Record({attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        r1.insert(function(){
          request(app)
          .post('/login')
          .field('email', 'test@nomail.com')
          .field('password', '1234')
          .end(function(err, res){
            cookie = res.headers['set-cookie'];
            done();
          });
        });
      });
    });
  });

  describe('GET /', function(){
    it('should display', function(done){
      request(app)
      .get('/')
      .expect(200, done);
    });
  });
  describe('GET /records', function(){
    it('should not display the recordindex', function(done){
      request(app)
      .get('/records')
      .expect(302, done);
    });
  });
  describe('GET /records', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/records')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('post /records', function(){
    it('should input', function(done){
      request(app)
      .post('/records')
      .field('lot', 'lot1')
      .expect(302, done);
    });
  });
  describe('get /find', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/find')
      .set('cookie', cookie)
      .expect(200,done);
    });
  });
  describe('post /recordsi/new', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/records/new')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('post /lot', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/lot')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('post /lot/:name', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/lot/lot')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('get /date', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/date')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('get /date/date', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/date/date')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('get /car', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/car')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('get /car/find', function(){
    it('should display the recordindex', function(done){
      request(app)
      .get('/car/find')
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('get /records/id', function(){
    it('should display the record', function(done){
      request(app)
      .get('/records/'+r1._id.toString())
      .set('cookie', cookie)
      .expect(200, done);
    });
  });
  describe('del /records/id', function(){
    it('should delete the record', function(done){
      request(app)
      .del('/records/'+r1._id.toString())
      .set('cookie', cookie)
      .expect(302, done);
    });
  });
});
