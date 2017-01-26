var latitude;
var longitude;
	/**********************************
	Initiering Google Maps
	**********************************/
  function initMap(latitude, longitude) {

    var markerPos = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
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
	/**********************************
	/Initiering Google Maps
	**********************************/

  //function för att sätta longitude och latitude
  function retLatLng (latitude, longitude) {
  	latitude = latitude;
  	longitude = longitude
  }


$(document).ready(function(){
	$("#weatherSearch").hide();
	$("#uvSearch").hide();
	$("#forecastSearch").hide();
	$("#ozoneSearch").hide();
	$(".backToMenuBtn").hide();
	$(".card").fadeIn("slow");
	
	/**********************************
	Tillbaka till meny
	**********************************/	
	$(".backToMenuBtn").click(function(){
		$("#weatherSearch").fadeOut("fast");
		$("#uvSearch").fadeOut("fast");
		$("#forecastSearch").fadeOut("fast");
		$("#ozoneSearch").fadeOut("fast");
		$("#weatherCard").fadeIn("slow");
		$("#uvCard").fadeIn("slow");
		$("#forecastCard").fadeIn("slow");
		$("#ozoneCard").fadeIn("slow");	
		$(".results").hide();	
	});	
	/**********************************
	/Tillbaka till meny
	**********************************/	

	/**********************************
	Vädret just nu
	**********************************/	
	$("#weatherBtn").click(function(){
		$("#weatherSearch").toggle("slow");
		$("#map").hide();
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
		$(".backToMenuBtn").show();

	});
	/**********************************
	/UV-index
	**********************************/

	/**********************************
	12h Forecast
	**********************************/	
	$("#forecastBtn").click(function(){
		$("#forecastSearch").toggle("slow");
		$("#weatherCard").hide();
		$("#uvCard").hide();
		$("#forecastCard").hide();
		$("#ozoneCard").hide();
		$(".backToMenuBtn").show();

	});
	/**********************************
	/12h Forecast
	**********************************/

	/**********************************
	Ozone
	**********************************/	
	$("#ozoneBtn").click(function(){
		$("#ozoneSearch").toggle("slow");
		$("#weatherCard").hide();
		$("#uvCard").hide();
		$("#forecastCard").hide();
		$("#ozoneCard").hide();
		$(".backToMenuBtn").show();

	});
	/**********************************
	/Ozone
	**********************************/

	/**********************************
	Navbar Home
	**********************************/
	$("#navHome").click(function(){
		$("#weatherSearch").fadeOut("fast");
		$("#uvSearch").fadeOut("fast");
		$("#forecastSearch").fadeOut("fast");
		$("#ozoneSearch").fadeOut("fast");
		$("#weatherCard").fadeIn("slow");
		$("#uvCard").fadeIn("slow");
		$("#forecastCard").fadeIn("slow");
		$("#ozoneCard").fadeIn("slow");	
		$(".results").hide();	
	});
	/**********************************
	/Navbar Home
	**********************************/

	/**********************************
	Navbar 12h forecast
	**********************************/
	$("#navWeather").click(function(){
		$("#uvSearch").toggle("slow");
		$("#weatherCard").hide();
		$("#uvCard").hide();
		$("#forecastCard").hide();
		$("#ozoneCard").hide();
		$(".backToMenuBtn").show();
	});
	/**********************************
	/Navbar 12h forecast
	**********************************/	

	/**********************************
	Navbar uv
	**********************************/
	$("#navUv").click(function(){
		$("#uvSearch").toggle("slow");
		$("#map").hide();
		$("#weatherCard").hide();
		$("#uvCard").hide();
		$("#forecastCard").hide();
		$("#ozoneCard").hide();		
	});
	/**********************************
	/Navbar üv
	**********************************/	

	/**********************************
	AJAX anropp för vädret just nu
	**********************************/
	$("#btn").click(function(){
		$(".backToMenuBtn").show();
		$("ul").fadeIn("fast");
		$("#map").fadeIn("slow");
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

			$(".results").html("<li>"+temp+"°C"+" och "+condition+"</li>");
			$("#headerCity").html("I "+search+" är vädret just nu"+":");
      initMap(latitude,longitude);
		});

	});
	/**********************************
	/AJAX anropp för vädret just nu
	**********************************/

	/**********************************
	AJAX anropp för UV-index
	**********************************/
	$("#uvSearchBtn").click(function(){

		$("ul").fadeIn("fast");
		var geocodeApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		var search = $("#uvSearchBox").val();
		var geocodeApiKey = "&key=AIzaSyAuFutnl3HZQLaCVm4KwxBMd8xfPIfVwHg";
		var geocodeUrl = geocodeApi+search+geocodeApiKey;
		var uvIndex;
		var colorCode;

		$.getJSON(geocodeUrl , function(data){
			latitude = data.results[0].geometry.location.lat;
			longitude = data.results[0].geometry.location.lng;
			
			var uvApi = "http://api.openweathermap.org/v3/uvi/";
			var latLng = latitude.toFixed()+","+longitude.toFixed();
			var timeStamp = "/current.json";
			var uvApiKey = "?appid=ac2a79b6cd5460524fd1766d1c265114";
			var uvUrl = uvApi + latLng + timeStamp + uvApiKey;			

			$.getJSON(uvUrl , function(data){

				var uv = data.data;
				if(uv >= 0.0 && uv <= 2.9){
					uvIndex = "Grön";
					colorCode = "låg";
				}
				else if (uv>=3.0 && uv<=5.9){
					uvIndex = "Yellow";
					colorCode = "måttlig";					
				}
				else if (uv>=6.0 && uv<=7.9){
					uvIndex = "Orange";
					colorCode = "hög";					
				}
				else if (uv>=8.0 && uv<=10.9){
					uvIndex = "Röd";
					colorCode = "väldigt hög";					
				}
				else {
					uvIndex = "Lila";
					colorCode = "extrem";
				}

				$("#headerUv").html("I "+search+" är UV-indexet just nu :");
				$(".results.results").html("<li>"+uv+"</li>");

				$("#uvAnswer").html("UV-index "+"<strong>"+uv+"</strong>"+ " innebär färgkod "+"<strong>"+uvIndex+"</strong>"+ " som i sin tur innebär att risken för skada vid exponering mot solen utan solkräm för den genomsnittlige människan är " + "<strong>"+colorCode+"</strong>");

			});
		});
	});
	/**********************************
	/AJAX anropp för UV-index
	**********************************/

	/**********************************
	AJAX anropp för 12h prognos
	**********************************/
	$("#forecastSearchBtn").click(function(){
		var forecastApi = "http://api.openweathermap.org/data/2.5/forecast?q=";
		var search = $("#forecastSearchBox").val();
		var modeJson = "&mode=json";
		var forecastApiKey = "&appid=ac2a79b6cd5460524fd1766d1c265114";
		var unit = "&units=metric";
		var forecastUrl = forecastApi + search + modeJson + forecastApiKey +unit;			

		$.getJSON(forecastUrl , function(data){

			var hour1 = data.list[0].main.temp;
			var timeStamp1 = data.list[0].dt_txt;
			var hour2 = data.list[1].main.temp;
			var timeStamp2 = data.list[1].dt_txt;
			var hour3 = data.list[2].main.temp;
			var timeStamp3 = data.list[2].dt_txt;
			var hour4 = data.list[3].main.temp;
			var timeStamp4 = data.list[3].dt_txt;
			var hour5 = data.list[4].main.temp;
			var timeStamp5 = data.list[4].dt_txt;

			$(".results").html("<li><strong>Datum/tid</strong>: "+timeStamp1+" <strong>Temperatur: </strong>"+hour1+"</li></br>");
			$("#headerForecast").html("De närmsta 12h i "+search+":");
			$(".results").append("<li><strong>Datum/tid</strong>: " +timeStamp2+ " <strong>Temperatur: </strong>"+hour2+"°C</li></br>");
			$(".results").append("<li><strong>Datum/tid</strong>: " +timeStamp3+ " <strong>Temperatur: </strong>"+hour3+"°C</li></br>");
			$(".results").append("<li><strong>Datum/tid</strong>: " +timeStamp4+ " <strong>Temperatur: </strong>"+hour4+"°C</li></br>");
			$(".results").append("<li><strong>Datum/tid</strong>: " +timeStamp5+ " <strong>Temperatur: </strong>"+hour5+"°C</li></br>");
		});
	});
	/**********************************
	/AJAX anropp för 12h prognos
	**********************************/

	/**********************************
	AJAX anropp för ozone
	**********************************/	
		$("#ozoneSearchBtn").click(function(){
			var geocodeApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
			var search = $("#ozoneSearchBox").val();
			var geocodeApiKey = "&key=AIzaSyAuFutnl3HZQLaCVm4KwxBMd8xfPIfVwHg";
			var geocodeUrl = geocodeApi+search+geocodeApiKey;
			$.getJSON(geocodeUrl , function(data){

				latitude = data.results[0].geometry.location.lat;
				longitude = data.results[0].geometry.location.lng;
				var ozoneApi = "http://api.openweathermap.org/pollution/v1/o3/";
				var latLng = latitude.toFixed() + "," + longitude.toFixed();
				var timeStamp = "/current.json";
				var ozoneApiKey = "?appid=ac2a79b6cd5460524fd1766d1c265114";
				var ozoneUrl = ozoneApi + latLng + timeStamp + ozoneApiKey;

				$.getJSON(ozoneUrl, function(data){
					var ozoneIndex = data.data;
					var ozoneMetric = ozoneIndex/100;
					$("#headerOzone").html("Ozonlagret över "+search+" är :");
					$(".results").html("<li>"+ozoneMetric+" milimeter tjockt</li>");						
				});
			});
		});
	/**********************************
	/AJAX anropp för ozone
	**********************************/	

}); /*document ready*/



