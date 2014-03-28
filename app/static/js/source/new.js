(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#a1').change(ea1);
    $('#n1').change(ea1);
    $('#a2').change(ea2);
    $('#n2').change(ea2);
    $('#a3').change(ea3);
    $('#n3').change(ea3);
    $('#a4').change(ea4);
    $('#n4').change(ea4);
    $('#a5').change(ea5);
    $('#n5').change(ea5);
  }


  function ea1(){
    $('#e1').val($('#n1').val()*$('#a1').val());
    $('#r2').removeClass('hideTwo');
    $('#ta').val($('#e1').val()*1+$('#e2').val()*1+$('#e3').val()*1+$('#e4').val()*1+$('#e5').val()*1);
    $('#uc').val($('#n1').val()*1+$('#n2').val()*1+$('#n3').val()*1+$('#n4').val()*1+$('#n5').val()*1);
  }
  function ea2(){
    $('#e2').val($('#n2').val()*$('#a2').val());
    $('#r3').removeClass('hideThree');
    $('#ta').val($('#e1').val()*1+$('#e2').val()*1+$('#e3').val()*1+$('#e4').val()*1+$('#e5').val()*1);
    $('#uc').val($('#n1').val()*1+$('#n2').val()*1+$('#n3').val()*1+$('#n4').val()*1+$('#n5').val()*1);
  }
  function ea3(){
    $('#e3').val($('#n3').val()*$('#a3').val());
    $('#r4').removeClass('hideFour');
    $('#ta').val($('#e1').val()*1+$('#e2').val()*1+$('#e3').val()*1+$('#e4').val()*1+$('#e5').val()*1);
    $('#uc').val($('#n1').val()*1+$('#n2').val()*1+$('#n3').val()*1+$('#n4').val()*1+$('#n5').val()*1);
  }
  function ea4(){
    $('#e4').val($('#n4').val()*$('#a4').val());
    $('#r5').removeClass('hideFive');
    $('#ta').val($('#e1').val()*1+$('#e2').val()*1+$('#e3').val()*1+$('#e4').val()*1+$('#e5').val()*1);
    $('#uc').val($('#n1').val()*1+$('#n2').val()*1+$('#n3').val()*1+$('#n4').val()*1+$('#n5').val()*1);
  }
  function ea5(){
    $('#e5').val($('#n5').val()*$('#a5').val());
    $('#ta').val($('#e1').val()*1+$('#e2').val()*1+$('#e3').val()*1+$('#e4').val()*1+$('#e5').val()*1);
    $('#uc').val($('#n1').val()*1+$('#n2').val()*1+$('#n3').val()*1+$('#n4').val()*1+$('#n5').val()*1);
  }

})();

