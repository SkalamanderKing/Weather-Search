var latitude;
var longitude;
	//initiering av google maps
  function initMap(latitude, longitude) {

    var uluru = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      draggable:true,
    });
  }

$(document).ready(function(){
	/*
	Knappen trycks och JSON hämtas
	*/
	$("#btn").click(function(){
		
		// Uppbyggnad av "Current Weather" api
		var currentWeatherApi = "http://api.openweathermap.org/data/2.5/weather?q=";
		var search = $("#searchBox").val();
		var apiKey = "&APPID=ac2a79b6cd5460524fd1766d1c265114";
		var unit = "&units=metric";
		var url = currentWeatherApi + search + apiKey + unit;

		// Uppbyggnad av "Current UV" api
		var uvApi = "http://api.openweathermap.org/v3/uvi/"
		var timeStamp = "/current.json";
		var uvUrl = "http://api.openweathermap.org/v3/uvi/52,-0/current.json?appid=ac2a79b6cd5460524fd1766d1c265114"

		$.getJSON(url , function(data){
			
			//Hämtar JSON data ang. lat & lng för map
			latitude = data.coord.lat;
			console.log(latitude);
			longitude = data.coord.lon;
			console.log(longitude);

			//hämtar JSON data för aktuellt väder 
			var temp = data.main.temp;
			var id = data.weather[0].id;
			var condition;
			//hämtar JSON data för aktuellt väder 

			var uvIndex;

			if(id>=200 && id<300){
				condition = "Thunderstorm"; 
			}
			else if (id>=300 && id<500){
				condition ="Drizzle";
			} 
			else if (id>=500 && id<600){
				condition = "Rain";
			} 
			else if (id>=600 && id<700){
				condition ="Snow";
			} 

			else if (id == 800){
				condition ="Snow";
			}
			else if (id == 741){
				condition ="Fog";
			}

			console.log(id);
			console.log(temp);
			$("ul").append("<li>"+temp+ " "+condition+"</li>");
      initMap(latitude,longitude);
		});

		$.getJSON(uvUrl , function(data){
			var uv = data.data;

			if(uv >= 0.0 && uv <= 2.9){
				uvIndex = "Green";
			}
			$("ul").append("<li>"+ uv + " " + uvIndex +"</li>");			
		});

	});
	/*
	Knappen trycks och JSON hämtas
	*/
});


//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=ac2a79b6cd5460524fd1766d1c265114&units=metric