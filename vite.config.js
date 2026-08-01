export default {
	server : {
		proxy: {
			"/api": "http://localhost:8080",
		},
	},
	optimizeDeps: {
		exclude: ['maplibre-gl']
	  },
}