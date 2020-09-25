#!/usr/bin/node
$(function () {
  const amenities = {};
  $('.inp_amenity').change(() => {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(amenities.values().join(', '));
  });
});
