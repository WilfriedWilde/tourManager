export async function getOrganizers() {
    const url = 'http://localhost:8080/organizers';

    try {
        const response = await fetch(url);
        const organizers = await response.json();

        return organizers
    } catch(err) {
        console.log('error fetching organizers:', err)
        return []
    }
}