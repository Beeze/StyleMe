$ ->
  location = $('.lat-long');

  $('.get-location').on 'click', (e) ->
    getlocation();

  getlocation = ->
    if (navigator.geolocation)
      navigator.geolocation.watchPosition(showPosition)
    else
      location.innerHTML = 'Geolocation is not supported by this browser.'
    return

  showPosition = (position)  ->
    location.innerHTML = 'Latitude: ' + position.coords.latitude +
        "<br> Longitude: " + position.coords.longitude
    console.log(position);
    return


