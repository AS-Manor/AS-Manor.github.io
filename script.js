// mapboxgl.accessToken = 'pk.eyJ1IjoiYXMtbWFub3IiLCJhIjoiY202bzllaG56MTA3djJrczRjeW5pdWl1eSJ9.BgZnQvFmOZrVJhsSCeHPiA';
// navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true})

// function successLocation(position) {
//     setupMap([position.coords.longitude, position.coords.latitude])
// }

// function errorLocation() {
//     setupMap([-1.7789778666324583, 53.64292387582586])
// }

// function setupMap(center) {
//     var map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: center,
//         zoom: 16
//       })
      
//     const nav = new mapboxgl.NavigationControl();
//     map.addControl(nav);

//     var directions = new MapboxDirections({
//         accessToken: mapboxgl.accessToken
//     });
//     map.addControl(directions, 'top-left')
// }

// mapboxgl.accessToken = 'pk.eyJ1IjoiYXMtbWFub3IiLCJhIjoiY202bzllaG56MTA3djJrczRjeW5pdWl1eSJ9.BgZnQvFmOZrVJhsSCeHPiA';

// function setupMap() {
//     var map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [-1.7789778666324583, 53.64292387582586], // University of Huddersfield
//         zoom: 16
//     });

//     const nav = new mapboxgl.NavigationControl();
//     map.addControl(nav);

//     var directions = new MapboxDirections({
//         accessToken: mapboxgl.accessToken
//     });
//     map.addControl(directions, 'top-left');
// }

// // Initialize map at University of Huddersfield
// setupMap();

mapboxgl.accessToken = 'pk.eyJ1IjoiYXMtbWFub3IiLCJhIjoiY202bzllaG56MTA3djJrczRjeW5pdWl1eSJ9.BgZnQvFmOZrVJhsSCeHPiA';

function setupMap() {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-1.7789778666324583, 53.64292387582586], // University of Huddersfield
        zoom: 16
    });

    // Add Navigation Control
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    // Fix: Correcting MapboxDirections instantiation
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric', // Ensures directions are in metric (kilometers)
        profile: 'mapbox/walking' // Optimized for pedestrian routes on campus
    });
    map.addControl(directions, 'top-left');

    // Custom buildings for local search
    var buildings = [
        { name: "Oastler Building", coordinates: [-1.777248233823057, 53.64469586451287] },
        { name: "Spark Jones Building", coordinates: [-1.7786238150343348, 53.641289266906355] },
        { name: "Haslett Building", coordinates: [-1.7776790844775374, 53.64168058275733]},
        { name: "3M Buckley Innovation Centre", coordinates: [-1.7769310878297153, 53.64164813611553]},
        { name: "Harold Wilson Building", coordinates: [-1.778407563071558, 53.643590156964876]},
        { name: "Richard Steinitz Building", coordinates: [-1.7778580836779672, 53.644232579148486]},
        { name: "Charles Sikes Building", coordinates: [-1.7756093650634615, 53.64324677769629]}
    ];

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        localGeocoder: function (query) {
            var results = buildings
                .filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
                .map(b => ({
                    center: b.coordinates,
                    place_name: b.name,
                    geometry: { type: "Point", coordinates: b.coordinates }
                }));
            console.log("Custom Geocoder Results:", results); // Debugging
            return results;
        },
        // Prioritizing local results over global search
        localGeocoderOnly: false
    });

    map.addControl(geocoder);
}

// Initialize map at University of Huddersfield
setupMap();
