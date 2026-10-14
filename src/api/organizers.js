export async function getOrganizers() {
    const url = '/api/organizers';

    try {
        const response = await fetch(url);
        const organizers = await response.json();

        return organizers
    } catch(err) {
        console.log('error fetching organizers:', err)
        return []
    }
}