package main

import (
	"net/http"
)

func main() {
	http.HandleFunc("/api/coordinates", HandleCoordinates)

	http.ListenAndServe(":8080", nil)
}
