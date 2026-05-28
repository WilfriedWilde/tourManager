export async function getCountries() {
    const url = '/api/countries';
    const response = await fetch(url);
    const countries = await response.json();

    return countries
}
