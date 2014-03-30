'use strict';

process.env.DBNAME= 'parking-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var Record;

describe('Record', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Record = require('../../app/models/record');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new record Object', function(){
      var r1 = new Record({attendants:'Robert', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      expect(r1).to.be.instanceof(Record);
      expect(r1.date).to.deep.equal(r1.date);
      expect(r1.lot).to.equal('lot1');
      expect(r1.occasion).to.equal('hockey');
      expect(r1.startTime).to.equal('5:00');
      expect(r1.endTime).to.equal('8:00');
      expect(r1.attendants).to.be.length(1);
      expect(r1.totalCards).to.equal(50);
      expect(r1.usedCards).to.equal(45);
      expect(r1.logOne).to.deep.equal({'amountPerVehicle':2, 'extendedAmount':12, 'note':'stuff', 'numberOfVehicles':6});
      expect(r1.logTwo).to.deep.equal({'amountPerVehicle':1, 'extendedAmount':7, 'note':'things', 'numberOfVehicles':7});
      expect(r1.logThree).to.deep.equal({'amountPerVehicle':10, 'extendedAmount':100, 'note':'super', 'numberOfVehicles':10});
      expect(r1.logFour).to.deep.equal({'amountPerVehicle':20, 'extendedAmount':60, 'note':'over-night', 'numberOfVehicles':3});
      expect(r1.logFive).to.deep.equal({'amountPerVehicle':5, 'extendedAmount':500, 'note':'lots of text', 'numberOfVehicles':100});
      expect(r1.totalAmount).to.equal(1000);
      expect(r1.startUp).to.equal(100);
      expect(r1.notes).to.equal('I hope this all works');
    });
    it('should create a new record with logs and attendants being ""',function(){
      var r1 = new Record({attendants:'Robert, Sam, John', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      expect(r1).to.be.instanceof(Record);
      expect(r1.date).to.deep.equal(r1.date);
      expect(r1.lot).to.equal('lot1');
      expect(r1.occasion).to.equal('hockey');
      expect(r1.startTime).to.equal('5:00');
      expect(r1.endTime).to.equal('8:00');
      expect(r1.attendants).to.be.length(3);
      expect(r1.totalCards).to.equal(50);
      expect(r1.usedCards).to.equal(45);
      expect(r1.logOne).to.deep.equal({'amountPerVehicle':2, 'extendedAmount':12, 'note':'', 'numberOfVehicles':6});
      expect(r1.logTwo).to.equal('');
      expect(r1.logThree).to.equal('');
      expect(r1.logFour).to.equal('');
      expect(r1.logFive).to.equal('');
      expect(r1.totalAmount).to.equal(1000);
      expect(r1.startUp).to.equal(100);
      expect(r1.notes).to.equal('I hope this all works');
    });
  });
  describe('#insert', function(){
    it('should insert a new record in the db', function(done){
      var r1 = new Record({attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      r1.insert(function(){
        expect(r1._id.toString()).to.have.length(24);
        expect(r1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('#update', function(){
    it('should update an existing record in the db', function(done){
      var r1 = new Record({attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      r1.insert(function(){
        r1.lot = 'Lot2';
        r1.occasion = 'music';
        r1.update(function(count){
          expect(count).to.equal(1);
          expect(r1.lot).to.equal('Lot2');
          expect(r1.occasion).to.not.be.equal('hockey');
          done();
        });
      });
    });
  });
  describe('.deleteById', function(){
    it('should find and delete record by id', function(done){
      var r1 = new Record({attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      r1.insert(function(){
        var id = r1._id.toString();
        Record.deleteById(id, function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find a single record by id and return it', function(done){
      var r1 = new Record({attendants:'',lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      r1.insert(function(){
        var id = r1._id.toString();
        Record.findById(id, function(record){
          expect(record._id.toString()).to.equal(id);
          done();
        });
      });
    });
  });

  describe('.find', function(){
    beforeEach(function(done){
      global.nss.db.dropDatabase(function(err, result){

        var r1 = new Record({attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r2 = new Record({attendants:'', lot:'lot2', occasion:'music', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r3 = new Record({attendants:'', lot:'lot3', occasion:'soul', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r4 = new Record({attendants:'', lot:'lot4', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r5 = new Record({attendants:'', lot:'lot5', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r6 = new Record({attendants:'', lot:'lot6', occasion:'music', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r7 = new Record({attendants:'', lot:'lot7', occasion:'things', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r8 = new Record({attendants:'', lot:'lot8', occasion:'new', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r9 = new Record({attendants:'', lot:'lot9', occasion:'all', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r10 = new Record({attendants:'', lot:'lot10', occasion:'stuff', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r11 = new Record({attendants:'', lot:'lot11', occasion:'I Really', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r12 = new Record({attendants:'', lot:'lot12', occasion:'dont like', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r13 = new Record({attendants:'', lot:'lot13', occasion:'writing', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r14 = new Record({attendants:'', lot:'lot14', occasion:'long', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r15 = new Record({attendants:'', lot:'lot15', occasion:'find', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r16 = new Record({attendants:'', lot:'lot16', occasion:'tests', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r17 = new Record({attendants:'', lot:'lot17', occasion:'they', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r18 = new Record({attendants:'', lot:'lot18', occasion:'are', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        var r19 = new Record({attendants:'', lot:'lot19', occasion:'soooooo', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', attendantTwo:'John', attendantThree:'Julius', attendantFour:'Rick', attendantFive:'Matt', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', noteOne:'stuff', numberOfVehiclesTwo:'7', amountPerVehicleTwo:'1', extendedAmountTwo:'7', noteTwo:'things', numberOfVehiclesThree:'10', amountPerVehicleThree:'10', extendedAmountThree:'100', noteThree:'super', numberOfVehiclesFour:'3', amountPerVehicleFour:'20', extendedAmountFour:'60', noteFour:'over-night', numberOfVehiclesFive:'100', amountPerVehicleFive:'5', extendedAmountFive:'500', noteFive:'lots of text', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
        r1.insert(function(){
          r2.insert(function(){
            r3.insert(function(){
              r4.insert(function(){
                r5.insert(function(){
                  r6.insert(function(){
                    r7.insert(function(){
                      r8.insert(function(){
                        r9.insert(function(){
                          r10.insert(function(){
                            r11.insert(function(){
                              r12.insert(function(){
                                r13.insert(function(){
                                  r14.insert(function(){
                                    r15.insert(function(){
                                      r16.insert(function(){
                                        r17.insert(function(){
                                          r18.insert(function(){
                                            r19.insert(function(){
                                              done();
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    it('should find all records - page 1, 10 per page', function(done){
      var query = {};

      Record.find(query, function(records){
        expect(records).to.have.length(10);
        done();
      });
    });
    it('should find all records - page 1, 7 per page', function(done){
      var query = {limit:'7'};

      Record.find(query, function(records){
        expect(records).to.have.length(7);
        done();
      });
    });
    it('should find all records - page 1, 12 per page', function(done){
      var query = {limit:'12'};

      Record.find(query, function(records){
        expect(records).to.have.length(12);
        done();
      });
    });
    it('should find all records page 2 4 task remaining', function(done){
      var query = {page:'2'};

      Record.find(query, function(records){
        expect(records).to.have.length(9);
        done();
      });
    });
    it('should find all record page 2 with 5 limit', function(done){
      var query = {direction:'1',limit:'5', page:'2'};

      Record.find(query, function(records){
        expect(records).to.have.length(5);
        expect(records[0].lot).to.equal('lot6');
        done();
      });
    });
    it('should find all record page 2 with 5 limit', function(done){
      var query = {direction:'-1',limit:'5', page:'2'};

      Record.find(query, function(records){
        expect(records).to.have.length(5);
        expect(records[0].lot).to.equal('lot6');
        done();
      });
    });
    it('should find by Date', function(done){
      var r1 = new Record({date:'3-3-20', attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      r1.insert(function(){
        Record.findByDate(r1.date, function(records){
          expect(records).to.have.length(1);
          expect(records[0].lot).to.equal('lot1');
          done();
        });
      });
    });
    it('should find by Lot', function(done){
      var r1 = new Record({attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', totalAmount:'1000', startUp:'100', notes:'I hope this all works'});
      r1.insert(function(){
        Record.findByLot(r1.lot, function(records){
          expect(records).to.have.length(2);
          expect(records[0].lot).to.equal('lot1');
          done();
        });
      });
    });
    it('should find by Car', function(done){
      var r1 = new Record({attendants:'', lot:'lot1', occasion:'hockey', startTime:'5:00', endTime:'8:00', attendantOne:'Robert', totalCards:'50', usedCards:'45', numberOfVehiclesOne:'6', amountPerVehicleOne:'2', extendedAmountOne:'12', totalAmount:'1000', startUp:'100', notes:'472042'});
      r1.insert(function(){
        Record.findByCar(r1.notes, function(records){
          expect(records).to.have.length(1);
          expect(records[0].lot).to.equal('lot1');
          done();
        });
      });
    });

  });
});



