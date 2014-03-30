'use strict';

var Record = require('../models/record');

exports.index = function(req, res){
  res.render('records/index');
};

exports.new = function(req, res){
  res.render('records/new');
};

exports.find = function(req, res){
  Record.find(req.query, function(records){
    res.send({records:records});
  });
};

exports.show = function(req, res){
  Record.findById(req.params.id, function(record){
    res.render('records/show', {record:record});
  });
};

exports.create = function(req, res){
  var record = new Record(req.body);
  record.insert(function(){
    res.redirect('/records/'+ record._id.toString());
  });
};

exports.destroy = function(req, res){
  Record.deleteById(req.params.id, function(record){
    res.redirect('/');
  });
};

exports.lotShow = function(req, res){
  Record.findByLot(req.params.lot, function(records){
    res.render('records/lotShow', {records:records});
  });
};

exports.lot = function(req, res){
  res.render('records/lot');
};

exports.dateShow = function(req, res){
  Record.findByDate(req.params.date, function(records){
    res.render('records/dateShow', {records:records});
  });
};

exports.date = function(req, res){
  res.render('records/date');
};


exports.car = function(req, res){
  res.render('records/car');
};

exports.findCar = function(req, res){
  Record.findByCar(req.query, function(records){
    res.send({records:records});
  });
};
