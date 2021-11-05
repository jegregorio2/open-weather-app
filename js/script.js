// OpenWeatherMap
// Current Weather
// api.openweathermap.org/data/2.5/weather?q={city_name},us&units=imperial&APPID={APIKEY}
// api.openweathermap.org/data/2.5/weather?zip={zipcodes},us&units=imperial&APPID={APIKEY}
// api.openweathermap.org/data/2.5/weather?q=vancouver,us&units=imperial&APPID=############# - see json-openweather-city.docx
// api.openweathermap.org/data/2.5/weather?zip=98686&units=imperial&APPID=############# - see json-openweather-zipcode.docx
// 5-days Forecast
// api.openweathermap.org/data/2.5/forecast?q={city_name},us&units=imperial&APPID={APIKEY}
// api.openweathermap.org/data/2.5/forecast?zip={zipcodes},us&units=imperial&APPID={APIKEY}
// api.openweathermap.org/data/2.5/forecast?q=vancouver,us&units=imperial&APPID=############# - see json-openweather-city-forecast.docx
// api.openweathermap.org/data/2.5/forecast?zip=98686&units=imperial&APPID=############# - see json-openweather-zipcode-forecast.docx

$(document).ready(function(){
	
	// Juan's openweather API key
	let api_key = "#############"; 
		
	// url to the API for openweather
	api_key = "&APPID=" + api_key; 
		
	// search for weather
	$('#search_weather').click(function(){
		$('#weather').html(''); 
        $('#weather').css({"display":"none"}); 
		let location = $('#searchbox').val(); 
		// if the input is empty, it will not process (validation)
		if (location != ''){
			getWeather(location);
		} 
	}); 

	// search for forecast
	$('#search_forecast').click(function(){
		$('#weather').html(''); 
        $('#weather').css({"display":"none"}); 
		let location = $('#searchbox').val(); 
		// if the input is empty, it will not process (validation)
		if (location != ''){
			getForecast(location);
		} 
	}); 

	// function isNumeric - to see if parameter is numeric or not
	function isNumeric(n){
		return !isNaN(parseFloat(n)) && isFinite(n);
	}; 

	// function getWeather - get location
	function getWeather(location){

        // variable
		let url = ""; 

		// zipcodes or city names
		if (isNumeric(location)){
			// zipcodes search
			url = "https://api.openweathermap.org/data/2.5/weather?zip=" + location + "&units=imperial" + api_key;
		} else {
			// city name search
			url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + ",us&units=imperial" + api_key;
		} 

		// ajax
		let jqxhr = $.ajax({
			url: url,
			method: 'GET',
			dataType: 'JSON'
		}) 
		
		.done(function(data){
			// console.log(data); // a long list of data
			// console.log(data.cod); // 200

            if (data.cod != '404'){
                
                // variable
    			let output = ""; 

    			// output
    			output += "<p></p>";
                output += "<div class=\"boxes\">";
                output += "<h2>City: " + data.name + "</h2>";
                output += "<div>";

                // get icon images - https://openweathermap.org/weather-conditions
                let icon = data.weather[0].icon;
                icon = "<img src=\"https://openweathermap.org/img/w/" + icon + ".png\" />";

                // JSON data
                description = data.weather[0].description;
                main_temp = data.main.temp;
                low_temp = data.main.temp_min;
                high_temp = data.main.temp_max;
                humidity = data.main.humidity;
                pressure = data.main.pressure;
                wind_speed = data.wind.speed;
                wind_deg = data.wind.deg;

                // output
                output += "<div class=\"left\">";
                output += icon;
                output += "</div>"; 
                output += "<div class=\"right\"><h2>" + main_temp + " °F</h2></div>";
                output += "<div class=\"clear\"></div>";
                output += "<p>" + description + "</p>";

                // table
                output += "<table>";
                output += "<tbody>";
                output += "<tr>";
                output += "<td>High</td>";
                output += "<td>" + high_temp + " °F</td>";
                output += "</tr>";
                output += "<tr>";
                output += "<td>Low</td>";
                output += "<td>" + low_temp + " °F</td>";
                output += "</tr>";
                output += "<tr>";
                output += "<td>Wind</td>";
                output += "<td>" + wind_speed + " m/s, " + wind_deg + " degree</td>";
                output += "</tr>";
                output += "<tr>";
                output += "<td>Pressure</td>";
                output += "<td>" + pressure + " hpa</td>";
                output += "</tr>";
                output += "<tr>";
                output += "<td>Humidity</td>";
                output += "<td>" + humidity + " %</td>";
                output += "</tr>";
                output += "</tbody>";
                output += "</table>";

                output += "</div>"; 

                $('#weather').css({"display":"block"}); 
                $('#weather').html(output);
            } else {
                $('#weather').css({"display":"block"}); 
                $('#weather').html("<h1>No weather available for that location. Please try again.</h1>");
            } 

		})
		
		.fail(function(){
			console.log("error");
		}) 
		
		.always(function(){
			console.log("complete");
		}); 
		
	}; 

	// function getForecast - get location
	function getForecast(location){

        // variable
		let url = ""; 

        // zipcodes or city names
        if (isNumeric(location)) {
            // zipcodes search
            url = "https://api.openweathermap.org/data/2.5/forecast?zip=" + location + "&units=imperial" + api_key;
        } else {
            // city names search
            url = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + ",us&units=imperial" + api_key;
        }

        // ajax
        let jqxhr = $.ajax({
          	url: url,
          	method: 'GET',
          	dataType: 'JSON'
      	}) 

        .done(function(data) {
          	// console.log(data); // a long list of data
           	// console.log(data.cod); // 200

            if (data.cod != '404'){

                // variable
              	let output = "";

              	// output
               	output += "<h2>City: " + data.city.name + "</h2>";

               	// loop
               	for (var i = 0; i < data.list.length; i += 8) {

                  	output += "<div>";
                  	output += "<div class=\"boxes\">";

                   	// get icon images - https://openweathermap.org/weather-conditions
                   	let icon = data.list[i].weather[0].icon;
                   	icon = "<img src=\"https://openweathermap.org/img/w/" + icon + ".png\" />";

                  	// JSON data
                  	description_5days = data.list[i].weather[0].description
                   	main_temp_5days = data.list[i].main.temp;
                   	low_temp_5days = data.list[i].main.temp_min;
                   	high_temp_5days = data.list[i].main.temp_max;
                   	humidity_5days = data.list[i].main.humidity;
                   	pressure_5days = data.list[i].main.pressure;
                   	wind_speed_5days = data.list[i].wind.speed;
                   	wind_deg_5days = data.list[i].wind.deg;
                   	date_5days = moment(data.list[i].dt_txt.substring(0, 10)).format('dddd'); 

                   	// output
                  	output += "<div><h2>" + date_5days + "</h2></div>";
                   	output += "<div class=\"clear\"></div>";
                   	output += "<div class=\"left\">";
                   	output += icon;
                   	output += "</div>"; 
                  	output += "<div class=\"right\"><h2>" + main_temp_5days + " °F</h2></div>";
                   	output += "<div class=\"clear\"></div>";
                   	output += "<p>" + description_5days + "</p>";

                  	// table
                   	output += "<table>";
                   	output += "<tbody>";
                   	output += "<tr>";
                   	output += "<td>High</td>";
                   	output += "<td>" + high_temp_5days + " °F</td>";
                   	output += "</tr>";
                   	output += "<tr>";
                   	output += "<td>Low</td>";
                   	output += "<td>" + low_temp_5days + " °F</td>";
                   	output += "</tr>";
                   	output += "<tr>";
                   	output += "<td>Wind</td>";
                   	output += "<td>" + wind_speed_5days + " m/s, " + wind_deg_5days + " degree</td>";
                   	output += "</tr>";
                   	output += "<tr>";
                   	output += "<td>Pressure</td>";
                   	output += "<td>" + pressure_5days + " hpa</td>";
                   	output += "</tr>";
                   	output += "<tr>";
                   	output += "<td>Humidity</td>";
                   	output += "<td>" + humidity_5days + " %</td>";
                   	output += "</tr>";
                   	output += "</tbody>";
                   	output += "</table>";

                   	output += "</div>"; 
                   	output += "</div>";
                }
                $('#weather').css({"display":"block"}); 
                $('#weather').html(output);
            } else {
                $('#weather').css({"display":"block"}); 
                $('#weather').html("<h1>No weather available for that location. Please try again.</h1>");
            }
      	}) 

       	.fail(function() {
          	console.log("error");
       	}) 

        .always(function() {
            console.log("complete");
        }); 
	}; 
	
}); 