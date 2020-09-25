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
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
});
