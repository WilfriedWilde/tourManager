import { Protocol } from "pmtiles";
import { getOrganizers } from "./fetch";

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
	container: 'map',
	style: {
		version: 8,
		sources: { 
			'countries': {
				type: 'vector',
				url: 'pmtiles://countries.pmtiles'
			}
		},
		layers: [
			{
				'id': 'countries-fill',
				'source': 'countries',
				'source-layer': 'countries',
				'type': 'fill',
			},
			{
				'id': 'countries-outline',
				'source': 'countries',
				'source-layer': 'countries',
				'type': 'line',
				'paint': {
					'line-width': 0.5
				}
			}
		],
	},
	center: [0, 20],
	zoom: 1,
})

const organizers = await getOrganizers();
const countries = organizers.map(o => {
	const country = o.country;

	return country.charAt(0).toUpperCase() + country.slice(1)
})

console.log(countries)

function updateCountries() {
	map.setPaintProperty('countries-fill', 'fill-color', [
		'case',
		['in', ['get', 'ADMIN'], ['literal', countries]],
		'#00ff00',
		'#bbbbbb',
	])

	map.setPaintProperty('countries-fill', 'fill-opacity', [
		'case',
		['in', ['get', 'ADMIN'], ['literal', countries]],
		0.7,
		0.3
	])

	map.setPaintProperty('countries-outline', 'line-color', [
		'case',
		['in', ['get', 'ADMIN'], ['literal', countries]],
		'#222222',
		'#777777'
	])
}

map.on('load', () => {
	map.setProjection({ type : 'globe' });
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
