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
  Record.finyById(req.params.id, function(record){
    res.redirect('/');
  });
};

exports.update = function(req, res){
  var updatedRecord = new Record(req.body);
  updatedRecord.update(function(count){
    res.redirect('/records/'+ updatedRecord._id.toString());
  });
};

