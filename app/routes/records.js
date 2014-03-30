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
  Record.findByLot(req.params.name, function(records){
    res.render('records/lotShow', {records:records});
  });
};

exports.dateShow = function(req, res){
  Record.findByDate(req.params.date, function(records){
    res.render('records/dateShow', {records:records});
  });
};

exports.total = function(req, res){
  Record.findAll(function(records){
    res.render('records/total', {records:records});
  });
};


exports.car = function(req, res){
  res.render('records/car');
};

exports.findCar = function(req, res){
  Record.findByCar(req.query, function(records){
    res.send({records:records});
  });
};
