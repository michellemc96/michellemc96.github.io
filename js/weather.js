$(document).ready(function(){
	var debug = false;
	var key = '346c58008e4d5f78';

	function currentConditionsUrl(query){
		if (debug) {
			return 'lookup.json';
		}
		 return 'http://api.wunderground.com/api/'+ key + '/conditions/q/'+query+'.json';
	}
	function forecastedConditionsUrl(query){
		if (debug) {
			return 'lookup.json';
		}
		return 'http://api.wunderground.com/api/'+ key + '/forecast/q/'+query+'.json';
	}	
	
	function currentConditions(query) {
		$.ajax({
			url: currentConditionsUrl(query),
			dataType: 'json',
			success: function(response) {
				console.log(response);
				$("#details").show();
				$('ul#error').empty();
				
				var current = response.current_observation;
				if (current == null) {
					var locations = response.response.results;
					for (var i = 0; i < locations.length; i++) {
						var location = locations[i];
						
						var city = "";
						if (location.country_name == 'USA') {
							city = location.city + ', ' + location.state;
						}
						else {
							city = location.city + ', ' + location.country_name;
						}
						
						var a = $('<a></a>')
								.attr("href", "#")
								.text(city)
								.on("click", function(event) {
									var query = $(this).text();
									
									$('input[name="query"]').val(query);
									search(query);
									
									event.preventDefault();
									return false;
								});
								
						var li = $('<li></li>').append(a);
						 $('ul#error').append(li);
					}
					$('#error_page').show();
					$('#conditions').hide();
					$('#forecast_info').hide();
				} 
				else {
					$("#full").text(current.display_location.full);
					$("#local_time_rfc822").text(current.local_time_rfc822);
					$("#temp_f").text(current.temp_f);
					$("#temp_c").text(current.temp_c);
					$("#wind_string").text(current.wind_string);
					
					$('#error_page').hide();
					$('#conditions').show();
					$('#forecast_info').show();
				}
			}
		}); 
	}
	
	function forecastedConditions(query) {		
		$.ajax({
			url: forecastedConditionsUrl(query),
			dataType: 'json',
			success: function(response) {
				if (response.forecast != undefined){					
					var forecast = response.forecast.txt_forecast.forecastday;
					$("#later_title").text(forecast[0].title);
					$("#later_icon_url").attr("src", forecast[0].icon_url);
					$("#later_fcttext_metric").text(forecast[0].fcttext_metric);
					
					$("#tomorrow_title").text(forecast[1].title);
					$("#tomorrow_icon_url").attr("src", forecast[1].icon_url);
					$("#tomorrow_fcttext_metric").text(forecast[1].fcttext_metric);
					
					$("#tomorrow_night_title").text(forecast[2].title);
					$("#tomorrow_night_icon_url").attr("src", forecast[2].icon_url);
					$("#tomorrow_night_fcttext_metric").text(forecast[2].fcttext_metric);	
				}
			}
		}); 
	}

	function search(query) {		
		currentConditions(query);
		forecastedConditions(query);
	}
	
  $('input[name="search"]').on('click', function(event){
	  search($('input[name="query"]').val());
	  event.preventDefault();
	  return false;
  });
});
