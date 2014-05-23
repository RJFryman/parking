'use strict';

module.exports = Record;

var records = global.nss.db.collection('records');
var Mongo = require('mongodb');
var _ = require('lodash');

function Record(data){
  this.date = data.date;
  this.lot = data.lot || 'no lot specified';
  this.occasion = data.occasion || ' no event specified';
  this.startTime = data.startTime || 'no starttime specified';
  this.endTime = data.endTime || 'no endtime specified';
  this.attendants = data.attendants.split(',').map(function(attendant){return attendant.trim();});
  this.attendants = _.compact(this.attendants);
  this.totalCards = parseInt(data.totalCards) || 50;
  this.usedCards = parseInt(data.usedCards) || 50;
  this.logOne = {
    numberOfVehicles : parseInt(data.numberOfVehiclesOne),
    amountPerVehicle : parseInt(data.amountPerVehicleOne),
    extendedAmount : parseInt(data.extendedAmountOne),
    note : data.noteOne || ''
  };
  this.logTwo = data.numberOfVehiclesTwo ? {
    numberOfVehicles : parseInt(data.numberOfVehiclesTwo),
    amountPerVehicle : parseInt(data.amountPerVehicleTwo),
    extendedAmount : parseInt(data.extendedAmountTwo),
    note : data.noteTwo
  } : '';
  this.logThree = data.numberOfVehiclesThree ? {
    numberOfVehicles : parseInt(data.numberOfVehiclesThree),
    amountPerVehicle : parseInt(data.amountPerVehicleThree),
    extendedAmount : parseInt(data.extendedAmountThree),
    note : data.noteThree
  } : '';
  this.logFour = data.numberOfVehiclesFour ? {
    numberOfVehicles : parseInt(data.numberOfVehiclesFour),
    amountPerVehicle : parseInt(data.amountPerVehicleFour),
    extendedAmount : parseInt(data.extendedAmountFour),
    note : data.noteFour
  } : '';
  this.logFive = data.numberOfVehiclesFive ? {
    numberOfVehicles : parseInt(data.numberOfVehiclesFive),
    amountPerVehicle : parseInt(data.amountPerVehicleFive),
    extendedAmount : parseInt(data.extendedAmountFive),
    note : data.noteFive
  } : '';
  this.totalAmount = parseInt(data.totalAmount);
  this.notes = data.notes;
}

Record.prototype.insert = function(fn){
  records.insert(this, function(err, record){
    fn(record);
  });
};

Record.prototype.update = function(fn){
  records.update({_id:this._id},this, function(err,count){
    fn(count);
  });
};

Record.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  records.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

Record.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);

  records.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

Record.findByLot = function(lot, fn){
  records.find({lot:lot}).toArray(function(err, records){
    fn(records);
  });
};

Record.findAll = function(fn){
  records.find().toArray(function(err, records){
    fn(records);
  });
};

Record.findByDate = function(date, fn){
  records.find({date:date}).toArray(function(err, records){
    fn(records);
  });
};

Record.findByCar = function(car, fn){
  car = new RegExp(car);
  records.find({notes:car}).toArray(function(err, records){
    fn(records);
  });
};

Record.find = function(query, fn){
  var limit = query.limit || 10;
  var skip = query.page ? (query.page - 1) * limit : 0;
  var filter = {};
  var sort = [];

  filter[query.filterName] = query.filterValue;

  if(query.sort){
    var direction = query.direction ? query.direction * 1 : 1;
    sort.push([query.sort, direction]);
  }

  records.find(filter, {sort:sort, skip:skip, limit:limit}).toArray(function(err, records){
    fn(records);
  });
};
