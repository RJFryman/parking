'use strict';

var Lot = require('../models/lot');

exports.index = function(req, res){
  Lot.findAll(function(lots){
    res.render('lots/index', {lots:lots});
};

exports.find = function(req, res){
  Lot.findAll(function(lots){
    res.send({lots:lots});
  });
};

expors.create = function(req, res){
  var lot = new Lot(req.body);
  lot.insert(function(){
    res.redirect('lots/index');
  });
};

exports.destroy = function(req, res){
  Lot.deleteById(req.params.id, function(count){
    res.redirect('lots/index');
  });
};

exports.update = function(req, res){
  var lot = new lot(req.body);
  lot.update(function(){
    res.redirect('lots/index');
  });
};
