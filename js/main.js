var latitude;
var longitude;
	//initiering av google maps
  function initMap(latitude, longitude) {

    var markerPos = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: markerPos,
      draggable: false,
      zoomControl:false,
      streetViewControl:false,
      scrollwheel:false
    });
    
    var marker = new google.maps.Marker({
      position: markerPos,
      map: map,

    });
  }

  function initUvMap(latitude, longitude) {

    var markerPos = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('uvMap'), {
      zoom: 4,
      center: markerPos,
      draggable: false,
      zoomControl:false,
      streetViewControl:false,
      scrollwheel:false
    });
    
    var marker = new google.maps.Marker({
      position: markerPos,
      setMap: uvMap,

    });
  }

  //function för att sätta longitude och latitude
  function retLatLng (latitude, longitude) {
  	latitude = latitude;
  	longitude = longitude
  }


$(document).ready(function(){
	$("#weatherSearch").hide();
	$("#uvSearch").hide();
	$(".backToMenuBtn").hide();
	$(".card").fadeIn("slow");
	
	//backToMenuBtn 
	$(".backToMenuBtn").click(function(){
		$("#weatherSearch").fadeOut("fast");
		$("#weatherCard").fadeIn("slow");
		$("#uvCard").fadeIn("slow");
		$("#forecastCard").fadeIn("slow");
		$("#ozoneCard").fadeIn("slow");		
	});	
	/**********************************
	Vädret just nu
	**********************************/	
	$("#weatherBtn").click(function(){
		$("#weatherSearch").toggle("slow");
		$("#weatherCard").hide();
		$("#uvCard").hide();
		$("#forecastCard").hide();
		$("#ozoneCard").hide();
	});
	/**********************************
	/Vädret just nu
	**********************************/

	/**********************************
	UV-index
	**********************************/	
	$("#uvBtn").click(function(){
		$("#uvSearch").toggle("slow");
		$("#weatherCard").hide();
		$("#uvCard").hide();
		$("#forecastCard").hide();
		$("#ozoneCard").hide();
	});
	/**********************************
	/UV-index
	**********************************/



	/**********************************
	Knappen trycks och JSON hämtas
	**********************************/
	$("#btn").click(function(){
		$(".backToMenuBtn").show();
		// Uppbyggnad av "Current Weather" api
		var currentWeatherApi = "http://api.openweathermap.org/data/2.5/weather?q=";
		var search = $("#searchBox").val();
		var apiKey = "&APPID=ac2a79b6cd5460524fd1766d1c265114";
		var unit = "&units=metric";
		var url = currentWeatherApi + search + apiKey + unit;

		$.getJSON(url , function(data){
			//Hämtar JSON data ang. lat & lng för map
			latitude = data.coord.lat;
			longitude = data.coord.lon;
			retLatLng(latitude,longitude);

			//hämtar JSON data för aktuellt väder 
			var temp = data.main.temp;
			var id = data.weather[0].id;
			var condition;
			//hämtar JSON data för aktuellt väder 

			if(id>=200 && id<300){
				condition = "åskstorm"; 
			}
			else if (id>=300 && id<500){
				condition ="duggregn";
			} 
			else if (id>=500 && id<600){
				condition = "regn";
			} 
			else if (id>=600 && id<700){
				condition ="snö";
			} 

			else if (id == 800){
				condition ="snö";
			}
			else if (id == 741){
				condition ="Fog";
			}

			$("ul").html("<li>"+temp+"°C"+" och "+condition+"</li>");
			$("#headerCity").html("I "+search+" är vädret just nu"+":");
      initMap(latitude,longitude);
		});

	});
	/*
	Knappen trycks och JSON hämtas
	*/

	/**********************************
	UV knapp sökningen
	**********************************/
	$("#uvSearchBtn").click(function(){
		// Uppbyggnad av "Current UV" api
		
		var geocodeApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		var search = $("#uvSearchBox").val();
		var geocodeApiKey = "&key=AIzaSyAuFutnl3HZQLaCVm4KwxBMd8xfPIfVwHg";
		var geocodeUrl = geocodeApi+search+geocodeApiKey;
		var uvIndex;

		$.getJSON(geocodeUrl , function(data){
			latitude = data.results[0].geometry.location.lat;
			longitude = data.results[0].geometry.location.lng;
			
			var uvApi = "http://api.openweathermap.org/v3/uvi/"
			var latLng = latitude.toFixed()+","+longitude.toFixed();
			var timeStamp = "/current.json";
			var uvApiKey = "?appid=ac2a79b6cd5460524fd1766d1c265114"
			var uvUrl = uvApi + latLng + timeStamp + uvApiKey;			

			$.getJSON(uvUrl , function(data){
				console.log(uvUrl);

				var uv = data.data;
				console.log(uv);

				if(uv >= 0.0 && uv <= 2.9){
					uvIndex = "Green";
				}
				$("#headerUv").html("I "+search+" är vädret just nu"+":");
				initUvMap(latitude,longitude);		
			});
		});
	/**********************************
	/UV knapp sökningen
	**********************************/

	});
});


//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=ac2a79b6cd5460524fd1766d1c265114&units=metric