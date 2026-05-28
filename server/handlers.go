package main

import (
	"context"
	"net/http"
)

func HandleCountries(w http.WriteResponse, r *http.Request) {
	
}

func HandleCoordinates(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	
	w.Write([]byte("connected!"))
}
