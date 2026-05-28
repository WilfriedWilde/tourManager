import geopandas as gpd

gdf = gpd.read_file("./src/assets/countries/ne_10m_admin_0_countries.shp")
gdf = gdf[["ADMIN", "ISO_A3", "geometry"]]
gdf.to_file("./src/assets/countries/countries.geojson", driver="GeoJSON")

