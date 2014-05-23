'use strict';

process.env.DBNAME= 'parking-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var Lot;

describe('Lot', function(){

  before(function(done){
    var initMongo=require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Lot = require('../../app/models/lot');
      done()
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new lot Object', function(){
      var l1 = new Lot({name:'big'});
      expect(l1).to.be.instanceof(Lot);
      expect(l1.name).to.deep.equal('big');
    });
  });
  describe('#insert', function(){
    it('should insert a new lot into the database', function(done){
      var l1 = new Lot({name:'big'});
      l1.insert(function(){
        expect(l1._id.toString()).to.have.length(24);
        expect(l1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('#update', function(){
    it('should update an existing lot in the database', function(done){
      var l1 = new Lot({name:'big'});
      l1.insert(function(){
        l1.name='lot2';
        l1.update(function(count){
          expect(count).to.equal(1);
          expect(l1.name).to.equal('lot2');
          done();
        });
      });
    });
  });
  describe('.deleteById', function(){
    it('should find and delete a lot form the database', function(done){
      var l1 = new Lot({name:'big'});
      l1.insert(function(){
        var id = l1._id.toString();
        Lot.deleteById(id, function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });
  describe('.find', function(){
    it('should find all the lots in the database', function(done){
      var l1 = new Lot({name:'foo'});
      var l2 = new Lot({name:'bar'});
      var l3 = new Lot({name:'baz'});
      var l4 = new Lot({name:'grille'});
      l1.insert(function(){
        l2.insert(function(){
          l3.insert(function(){
            l4.insert(function(){
              Lot.findAll(function(lots){
                expect(lots).to.have.length(4);
                expect(lots[0].name).equal('foo');
                done();
              });
            });
          });
        });
      });
    });
  });
});
