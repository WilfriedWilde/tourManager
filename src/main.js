import { createClient } from "@supabase/supabase-js";
import MaplibreTransition from "maplibre-transition";
import { getCountries, getCoordinates } from "/src/fetch.js"

const map = new maplibregl.Map({
	container: 'map',
	style: {
		version: 8,
		sources: { 
			'countries': {
				type: 'geojson',
				data: '/countries.geojson'
			}
		},
		layers: [
			{
				'id': 'countries-fill',
				'source': 'countries',
				'type': 'fill',
			},
			{
				'id': 'countries-outline',
				'source': 'countries',
				'type': 'line',
				'paint': {
					'line-width': 0.5
				}
			}
		],
	},
	center: [0, 0],
	zoom: 2,
	projection: 'mercator'
})

let selectedCountries = await getCountries();
selectedCountries = selectedCountries.map(c => c.charAt(0).toUpperCase() + c.slice(1))

let coords = await getCoordinates();
console.log(coords)
function updateCountries() {
	map.setPaintProperty('countries-fill', 'fill-color', [
		'case',
		['in', ['get', 'ADMIN'], ['literal', selectedCountries]],
		'#00ff00',
		'#bbbbbb',
	])

	map.setPaintProperty('countries-fill', 'fill-opacity', [
		'case',
		['in', ['get', 'ADMIN'], ['literal', selectedCountries]],
		0.7,
		0.3
	])

	map.setPaintProperty('countries-outline', 'line-color', [
		'case',
		['in', ['get', 'ADMIN'], ['literal', selectedCountries]],
		'#222222',
		'#777777'
	])
}

map.on('load', () => {
	updateCountries()
})

/*
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [0, 20],
    zoom: 2,
    projection: 'mercator'
});

const marker = new maplibregl.Marker()
	.setLngLat([12.550343, 55.665957])
	.addTo(map);

map.on('load', () => {
	map.setPaintProperty('countries-fill', 'fill-color', '#cccccc')

	MaplibreTransition.init(map);
});

let hoveredId = null;

map.on('mouseenter', 'countries-fill', (e) => {
	map.getCanvas().style.cursor = 'pointer';
})

map.on('click', 'countries-fill', (e) => {
    const feature = e.features[0];
	if (!feature) return
    if (feature.id === hoveredId) return;

    hoveredId = feature.id;

    map.transition(feature, {
        duration: 1000,
        delay: 0,
        ease: 'linear',
        paint: {
            'fill-color': ['#cccccc', '#00ff00']
        }
    });
});

map.on('mouseleave', 'countries-fill', () => {
    map.getCanvas().style.cursor = '';
});
*/
