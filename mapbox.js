require ('dotenv').config();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingService = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

exports.forwardGeocoder = function(location){
	try {
	let response = geocodingService.forwardGeocode({
		  query: location,
		  limit: 1
		})
		  .send()
		  .then(response => {
			const match = response.body;
			console.log(match);
			return geocode = match; 
		  });
	} catch(err){
		console.log(err.message);
	}
	
}

exports.reverseGeocoder = function([lat, lng]){
	try {
	let response = geocodingService.reverseGeocode({
		  query: [lat, lng],
		})
		  .send()
		  .then(response => {
			const match = response.body;
			console.log("RESPONSE:",match);
			return match;
		  });
	} catch(err){
		console.log(err.message);
	}
	
}

<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' rel='stylesheet' />

  <style>
    body {
       margin: 0;
       padding: 0;
    }
	  
	.marker {
		background-image: url('/images/pngguru.com.png');
		background-size: cover;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
	}

    #map {
		margin-bottom:10px;
		position: relative;
    	top: 0;
    	bottom: 0;
    	width: 100%;
		height: 500px;
    }
	  
	  .mapboxgl-popup {
		max-width: 200px;
	}

	.mapboxgl-popup-content {
		text-align: center;
		font-family: 'Open Sans', sans-serif;
	}
    </style>

<script>

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RveWFuODIiLCJhIjoiY2s3bTV6eGJrMDZpajNlcDNyM3p6Mmh2YiJ9.s5p1QjV31MxdS9x7ZNYEiQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/stoyan82/ck7xiqeup1h4l1ipmw0m77rwg',
  center: [-96, 37.8],
  zoom: 2
});

var geojson = {
  
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.257779, 73.34024]
    },
    properties: {
      title: campground.location
    }
};
	
// add markers to map
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
	.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML("<h3>marker.properties.title </h3>"))
    .addTo(map);
});

</script>
// Geocoder.reverseGeocoder([23.3219, 42.6977]);
