(function(){

  'use strict';

  $(document).ready(initialize);

  var query = {limit:10, page:1, direction:1};

  function initialize(){
    $(document).foundation();
    $('#cats').on('click', '.filter', filterrecords);
    $('#records').on('click', '.filter', filterrecords);
    $('#records').on('click', '.sort', sortrecords);
    $('#prev').click(clickPrev);
    $('#next').click(clickNext);
    $('#clearFilter').click(clearFilter);
    getAllrecords();
  }

  function clearFilter(){
    query = {limit:10, page:1, direction:1};
    generateQuery();
    event.preventDefault();
  }

  function sortrecords(event){
    if($(this).hasClass('date')){
      query.sort = 'date';
    }else if ($(this).hasClass('lot')){
      query.sort = 'lot';
    }else{
      query.sort = 'occasion';
    }

    query.direction *= -1;
    generateQuery();
    event.preventDefault();
  }

  function filterrecords(event){
    if($(this).hasClass('year')){
      query.filterName = 'year';
      query.filterValue = $(this).text();
    }else if ($(this).hasClass('lot')){
      query.filterName = 'lot';
      query.filterValue = $(this).text();
    }else if ($(this).hasClass('attendants')){
      query.filterName = 'attendants';
      query.filterValue = $(this).text();
    }else{ ($(this).hasClass('occasion'));
      query.filterName = 'occasion';
      query.filterValue = $(this).text();
    }


    generateQuery();
    event.preventDefault();
  }

  function clickPrev(){
    if(query.page > 1){query.page--;}
    query.limit = $('#limit').val() * 1 || query.limit;
    generateQuery();
  }

  function clickNext(){
    query.page++;
    query.limit = $('#limit').val() * 1 || query.limit;
    generateQuery();
  }

  function generateQuery(){
    var url = '/find';
    var data = query;
    var type = 'GET';
    var success = addrecordsToTable;

    $.ajax({data:data, url:url, type:type, success:success});
  }

  function getAllrecords(){
    var url ='/find';
    var type = 'GET';
    var success = addrecordsToTable;

    $.ajax({url:url, type:type, success:success});
  }

  function addrecordsToTable(payload){
    $('.list-table').slideUp(300).delay(800).fadeIn(800);
    $('#records > tbody').empty();
    $('#page').fadeIn(500, function(){
      $('#page').text(query.page);
    });

    for(var i = 0; i < payload.records.length; i++){
      addrecordToTable(payload.records[i]);
    }
  }

  function addrecordToTable(record){
    var $row = $('<tr>');
    var $gtr = $('<td>');
    var $date = $('<td>');
    var $lot = $('<td>');
    var $occasion = $('<td>');
    var $attendants = $('<td>');

    $row.attr('data-record-id', record._id);

    $gtr.append('<a href="/records/'+record._id.toString()+'">Record</a>').fadeIn(1000);

    $date.append(moment(record.date).format('MMMM Do YYYY')).fadeIn(1000);
    $lot.append('<a class="filter lot" href="#">'+record.lot+'</a>').fadeIn(1000);
    $occasion.append('<a class="filter occasion" href="#">'+record.occasion+'</a>').fadeIn(1000);

    for(var i = 0; i < record.attendants.length; i++){
      var attendant = record.attendants[i];
      $attendants.append('<a class="filter attendants" href="#">'+attendant+'</a>'+ ' ' ).fadeIn(1000);
    }

    $row.append($gtr, $date, $lot, $occasion, $attendants).fadeIn(1000);
    $('#records > tbody').append($row);
  }

})();

