#!/usr/bin/node
$(function () {
  const amenities = {};
  $('.inp_amenity').change(function (e) {
    if (this.checked) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
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
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: ShowPlaces
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      contentType: 'application/json',
      dataType: 'json',
      success: ShowPlaces
    });
  });

  function ShowPlaces (data) {
    $('section.places').empty();
    for (let i = 0; i < data.length; i++) {
      $('section.places').append(
        `<article>
          <div class="title_box">
            <h2>${data[i].name}</h2>
            <div class="price_by_night">${data[i].price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${data[i].max_guest} Guests </div>
            <div class="number_rooms">${data[i].number_rooms}
              Bedrooms </div>
            <div class="number_bathrooms">${data[i].number_bathrooms}
              Bathrooms</div>
            </div>
            <div class="description">
              ${data[i].description}
            </div>
          </article>`
      );
    }
  }
});
