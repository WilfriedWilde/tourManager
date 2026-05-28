import { createClient } from "@supabase/supabase-js";
import MaplibreTransition from "maplibre-transition"

const supabase = createClient('https://qqhoykbyektztzwfhxjt.supabase.co', 'sb_publishable_R8xRbhnBAJhxtBHYg79kVA_kO4W0E5Y')

const { data, error } = await supabase
	.from('venues')
	.select('*')

console.log("data", data, "error", error)

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
				'paint': {
					'fill-color': '#cccccc',
					'fill-opacity': 0.4
				}
			},
			{
				'id': 'countries-outline',
				'source': 'countries',
				'type': 'line',
				'paint': {
					'line-color': '#111',
					'line-width': 0.5
				}
			}
		],
	},
	center: [0, 0],
	zoom: 2,
	projection: 'mercator'
})

let selectedCountries = ['France', 'Finland', 'Spain', 'Germany', 'Italy', 'United States of America'];

function updateFilter() {
	if (selectedCountries.length === 0) {
		map.setFilter('countries-fill', ['==', ['get', 'ADMIN', '__none__']]);
		map.setFilter('countries-outline', ['==', ['get', 'ADMIN', '__none__']]);
		return;
	}

	map.setFilter('countries-fill', [
		'in',
		['get', 'ADMIN'],
		['literal', selectedCountries]
	]);

	map.setFilter('countries-outline', [
		'in',
		['get', 'ADMIN'],
		['literal', selectedCountries]
	]);
}

map.on('load', () => {
	updateFilter()
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
