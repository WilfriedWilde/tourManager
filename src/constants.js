let root = null;

export function getColors() {
    root = getComputedStyle(document.documentElement);

    return {
        countries: {
            fill: {
                inactive: parseLightDark("--country-fill-inactive"),
                active: parseLightDark("--country-fill-active"),
                selected: parseLightDark("--country-fill-selected"),
            },
            outline: {
                inactive: parseLightDark("--country-outline-inactive"),
                active: parseLightDark("--country-outline-active"),
                selected: parseLightDark("--country-outline-selected"),
            }
        },
        markers: {
            venue: parseLightDark("--markers-venue"),
            festival: parseLightDark("--markers-festival"),
        }
    }
}

function parseLightDark(key) {
    const regexp = /\((.*)\)/g;
    const raw = root.getPropertyValue(key).trim();
    const match = [...raw.matchAll(regexp)][0][1]
    if (!match) return null;

    const [light, dark] = match.split(", ");
    return { light, dark };
}