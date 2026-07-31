export async function getOrganizers() {
    const url = 'http://localhost:8080/organizers';
    const response = await fetch(url);
    const organizers = await response.json();

    return organizers
}