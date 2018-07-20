mapboxToken = "pk.eyJ1Ijoic3JhbmQiLCJhIjoiY2ppYXVoc2tlMTgzbjNrbWx4N3c2bGFiZSJ9.bqL8SapqOOw33OJYyrOBNQ";

// create the tile layer that will be the background of our map
var mapBox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=" + mapboxToken;

// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
});

// Add a tile layer
L.tileLayer(mapBox).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(mag) {
  return mag * 10;
}

// perform API call
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  createMarkers(data);
});


function createMarkers(response) {

  // pull the earthquakes off of response
  var quakes = response.features;

  // loop through the quakes array
  for (var i = 0; i < quakes.length; i++){
    var quake = quakes[i];

    // for each quake, create a circle and bind a popup with title
    L.circle(
      [quake.geometry.coordinates[1], quake.geometry.coordinates[0]],
      )
      .bindPopup("<h3>" + quake.properties.title + "</h3>").addTo(myMap);

      var geojsonMarkerOptions = {
        fillOpacity: 0.75,
        color: "black",
        fillColor: "purple",
        radius: markerSize(quake.properties.mag)
      };

      // L.geoJSON(someGeojsonFeature, {
      //   pointToLayer: function (feature, latlng) {
      //       return L.circleMarker(latlng, geojsonMarkerOptions);
      //   }
      // }).addTo(map);
  }
}