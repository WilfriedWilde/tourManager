const root = getComputedStyle(document.documentElement);

export const colors = {
    countries: {
            fill: {
                inactive: root.getPropertyValue(--country-fill-inactive),
                active: root.getPropertyValue(--country-fill-active),
                selected: root.getPropertyValue(--country-fill-selected),
            },
            outline: {
                inactive: root.getPropertyValue(--country-outline-inactive),
                active: root.getPropertyValue(--country-outline-active),
                selected: root.getPropertyValue(--country-outline-selected),
            }
    },
    markers: {
        venue: root.getPropertyValue(--markers-venue),
        festival: root.getPropertyValue(--markers-festival),
    }
}