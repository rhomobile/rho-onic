

angular.module('appforum.factory', [])
  .factory('Tubes', function($http) {
    return {
      getStatus: function(mFrom,mTo) {
      	var url = encodeURI()
      	return $http.get('https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status?startDate='+ mFrom.format() + '&endDate=' + mTo.format() + '&app_id=2cea58b7&app_key=ce86a62f15868d50940b425746af636f')
          
      },
      getArrivals: function(line){
      	return $http.get('https://api.tfl.gov.uk/line/'+line+'/arrivals?app_id=2cea58b7&app_key=ce86a62f15868d50940b425746af636f')
      },
      getStyles : function(){
      	return   {
		    "bakerloo": { color: "#894E24"},
		    "central": {color: "#DC241F"},
		    "circle": {color: "#FFCE00"},
		    "district": {color:"#007229"},
		    "hammersmith-city": {color:"#D799AF"},
		    "jubilee": {color:"#6A7278"},
		    "metropolitan": {color:"#751056"},
		    "northern": {color:"#000000"},
		    "piccadilly": {color:"#0019A8"},
		    "victoria": {color:"#00A0E2"},
		    "waterloo-city": {color:"#76D0BD"},
		    "london-overground": {color:"#E86A10"},
		    "tfl-rail": {color:"#0019A8"},
		    "dlr": {color:"#00AFAD"},
		}
      }
    };
  })
;