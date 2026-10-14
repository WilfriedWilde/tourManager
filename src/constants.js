const root = getComputedStyle(document.documentElement);

export const colors = {
    countries: {
            fill: {
                inactive: root.getPropertyValue("--country-fill-inactive").trim(),
                active: root.getPropertyValue("--country-fill-active").trim(),
                selected: root.getPropertyValue("--country-fill-selected").trim(),
            },
            outline: {
                inactive: root.getPropertyValue("--country-outline-inactive").trim(),
                active: root.getPropertyValue("--country-outline-active").trim(),
                selected: root.getPropertyValue("--country-outline-selected").trim(),
            }
    },
    markers: {
        venue: root.getPropertyValue("--markers-venue").trim(),
        festival: root.getPropertyValue("--markers-festival").trim(),
    }
}