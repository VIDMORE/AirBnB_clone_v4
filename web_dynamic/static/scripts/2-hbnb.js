#!/usr/bin/node
$(function () {
  const amenities = {};
  $('.inp_amenity').change(function(e) {
    if (this.checked) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      console.log(amenities)
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities).length === 0) {
      $('.amenities h4').html('&nbsp');
    } else {
      $('.amenities h4').text(Object.values(amenities).join(', '));
    }
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', (data, status) => {
    if (data.status === "OK") {
      $('#api_status').addClass('available')
    }
    else {
      $('#api_status').removeClass('available')
    }
  });

});
