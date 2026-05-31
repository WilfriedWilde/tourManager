export async function getCountries() {
    const url = '/api/countries';
    const response = await fetch(url);
    const countries = await response.json();

    return countries
}

export async function getCoordinates() {
	const url = '/api/coordinates';
	const response = await fetch(url);
	const coords = await response.json();

	return coords
}
