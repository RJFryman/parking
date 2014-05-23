'use strict';

module.exports = Lot;

var lots = global.nss.db.collection('lots');
var Mongo = require('mongodb');

function Lot(data){
  this.name = data.name;
}

Lot.prototype.insert = function(fn){
  lots.insert(this, function(err, record){
    fn(record);
  });
};

Lot.prototype.update = function(fn){
  lots.update({_id:this._id},this, function(err, count){
    fn(count);
  });
};

Lot.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  lots.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

Lot.findAll = function(fn){
  lots.find().toArray(function(err, lots){
    fn(lots);
  });
};

Lot.findById = function(id, fn){
  var _id = Mongo.ObjectId(id);
  lots.findOne({_id:_id}, function(err, lot){
    fn(lot);
  });
};
