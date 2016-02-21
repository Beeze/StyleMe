$ ->
  location = $('.lat-long');

  $('.get-location').on 'click', (e) ->
    getlocation();

  getlocation = ->
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(showPosition)
    else
      location[0].innerHTML = "Geolocation not supported by browser"

  showPosition = (position)  ->

    userLocal =
      lat : position.coords.latitude
      long : position.coords.longitude

    $.post '/weatherMe',
      data: userLocal,
      dataType: 'json'

    return


