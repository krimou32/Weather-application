$(document).ready(function(){

  var latitude, longitude, temperature, loc, desc;
  var wrapper = $("#wrapper");
  var tempunit = $("#unit");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      //console.log(latitude + " " + longitude);

      $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {
          lat: latitude,
          lon: longitude,
          appid: '38098664eba5a1a47ebe275e6eef2290',
          units: 'metric'
        },
        type: 'GET',
        success: function(data) {
          // Set temperature
          //console.log(data.main.temp);
          temperature = Math.round(data.main.temp);
          tempcelcius = temperature;
          $("#temp").text(temperature);

          //Set location
          //console.log(data.name);
          loc = data.name;
          $("#location").text(loc);

          //Set weather
          //console.log(data.weather[0].main);
          desc = data.weather[0].main;
          $("#weatherdesc").text(desc);

          //Change BG according to weather
          if (desc === "Clouds") {
            wrapper.addClass("cloudy");
          } else if (desc === "Rain") {
            wrapper.addClass("rainy");
          } else if (desc === "Snow") {
            wrapper.addClass("snowing");
          } else if (desc === "Extreme" || desc === "Storm") {
            wrapper.addClass("storm");
          } else if (desc === "Clear") {
            wrapper.addClass("sunny");
          }

          // Change temperature unit
          tempunit.on("click", function(){
            if (tempunit.text() === "°C") {
              var fahrenheit = (temperature * (9/5)) + 32;
              $("#temp").text(fahrenheit);
              //console.log(fahrenheit);
              tempunit.text("°F");
            } else if (tempunit.text() === "°F") {
              $("#temp").text(tempcelcius);
              tempunit.text("°C");
            }
          });
        }
      }).fail(function(error) {
        console.error(error);
        alert("Error getting the weather");
      });
    });
  }
});
