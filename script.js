mapboxgl.accessToken = 'pk.eyJ1IjoiYXMtbWFub3IiLCJhIjoiY202bzllaG56MTA3djJrczRjeW5pdWl1eSJ9.BgZnQvFmOZrVJhsSCeHPiA';
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true})

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([-1.7789778666324583, 53.64292387582586])
}

function setupMap(center) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 16
      })
      
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    });
    map.addControl(directions, 'top-left')
}