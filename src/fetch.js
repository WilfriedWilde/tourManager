export async function getOrganizers() {
    const url = 'api/organizers';
    const response = await fetch(url);
    const organizers = await response.json();

    return organizers
}