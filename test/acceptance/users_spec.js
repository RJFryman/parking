/* jshint expr:true */

'use strict';

process.env.DBNAME = 'ping-me-test';
var request = require('supertest');
var app = require('../../app/app');
var expect = require('chai').expect;
var User, u;
var cookie;

describe('user', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u = new User({username:'test', email:'test@nomail.com', password:'1234'});
      u.register(function(){
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

  describe('GET /register', function(){
    it('should display the register page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });
  describe('POST /register', function(){
    it('should allow a user to register', function(done){
      request(app)
      .post('/register')
      .field('username', 'rjfryman')
      .field('email', 'robert.fryman@gmail.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });

    it('should not allow a duplicate email to register', function(done){
      request(app)
      .post('/register')
      .field('email', 'test@nomail.com')
      .field('password', '1234')
      .field('role', 'host')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });

  describe('GET /auth', function(){
    it('should display the auth page', function(done){
      request(app)
      .get('/login')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });
  });


  describe('POST /login', function(){
    it('should login registered user', function(done){
      request(app)
      .post('/login')
      .field('email', 'test@nomail.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });

    it('should not login unregistered user by email', function(done){
      request(app)
      .post('/login')
      .field('email', 'test@yesmail.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should not login user with wrong password', function(done){
      request(app)
      .post('/login')
      .field('email', 'test@nomail.com')
      .field('password', '4321')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('Post Logout', function(){
    it('should logout a user', function(done){
      request(app)
      .post('/logout')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

});

