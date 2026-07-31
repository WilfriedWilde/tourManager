export async function getOrganizers() {
    const url = 'http://localhost:8080/organizers';
    const response = await fetch(url);
    const organizers = await response.json();

    return organizers
}

export async function getCountries() {
    const url = 'http://localhost:8080/countries';
    const response = await fetch(url);
    const countries = await response.json();

    return countries
}

export async function getCoordinates() {
	const url = 'http://localhost:8080/coordinates';
	const response = await fetch(url);
	const coords = await response.json();

	return coords
}