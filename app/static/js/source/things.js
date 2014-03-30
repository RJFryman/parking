(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    updateTCU();
    updateTEA();
    updateAPV();
  }
  var TCU=0;
  var TEA=0;

  function updateTCU(){
    $('.nv').each(function(){
      TCU += ($(this).val()*1);
    });
    $('#TCU').text(TCU);
  }
  function updateTEA(){
    $('.ea').each(function(){
      TEA += ($(this).val()*1);
    });
    $('#TEA').text(TEA);
  }
  function updateAPV(){
    var APV = (TEA/TCU);
    APV = Math.round(APV *100)/100;
    $('#APV').text(APV);
  }

})();

