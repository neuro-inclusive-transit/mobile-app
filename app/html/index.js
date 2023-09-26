const urlParams = new URLSearchParams(window.location.search);
const hereApiKey = urlParams.get("hereApiKey");

const currentLocation = {
  lat: urlParams.get("currentLocation").split(",").map(Number)[0],
  lng: urlParams.get("currentLocation").split(",").map(Number)[1],
};

const startLocation = decodeURIComponent(urlParams.get("startLocation"));
const endLocation = decodeURIComponent(urlParams.get("endLocation"));

console.log(startLocation);
console.log(endLocation);

// Initialize the platform object:
var platform = new H.service.Platform({
  apikey: hereApiKey,
});

// Retrieve the target element for the map:
var targetElement = document.getElementById("mapContainer");

// Obtain the default map types from the platform object
var mapLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(targetElement, mapLayers.vector.normal.map, {
  zoom: 15,
  center: currentLocation,
});

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Add event listener:
map.addEventListener("tap", function (evt) {
  // Log 'tap' and 'mouse' events:
  console.log(evt.type, evt.currentPointer.type);
});

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

// Create the default UI:
const ui = H.ui.UI.createDefault(map, mapLayers);

var routingParameters = {
  routingMode: "fast", //TODO: sync with mobile app
  transportMode: "pedestrian",
  // The start point of the route:
  origin: startLocation,
  // The end point of the route:
  destination: endLocation,
  // Include the route shape in the response
  return: "polyline",
};

// Define a callback function to process the routing response:
var onResult = function (result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
      // Create a linestring to use as a point source for the route line
      let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

      console.log(section.polyline);

      // Create a polyline to display the route:
      let routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: "blue", lineWidth: 3 },
      });

      // Create a marker for the start point:
      let startMarker = new H.map.Marker(section.departure.place.location);

      // Create a marker for the end point:
      let endMarker = new H.map.Marker(section.arrival.place.location);

      // Add the route polyline and the two markers to the map:
      map.addObjects([routeLine, startMarker, endMarker]);

      // Set the map's viewport to make the whole route visible:
      map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    });
  }
};

// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult, function (error) {
  alert(error.message);
});
