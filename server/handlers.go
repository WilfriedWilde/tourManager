package main

import (
	"encoding/json"
	"net/http"
)

type Coord struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
}

func HandleCountries(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	rows, err := db.Query(ctx, "SELECT DISTINCT country FROM venues")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer rows.Close()
	
	var countries []string

	for rows.Next() {
		var country string
		if err := rows.Scan(&country); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		countries = append(countries, country)

	}

	if err = json.NewEncoder(w).Encode(countries); err != nil {
		http.Error(w, err.Error(), 500)
	}
}

func HandleCoordinates(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	rows, err := db.Query(ctx, "SELECT DISTINCT latitude, longitude FROM venues")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer rows.Close()

	var coords []Coord
	for rows.Next() {
		var c Coord
		if err := rows.Scan(&c.Lat, &c.Lon); err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		coords = append(coords, c)
	}

	if err = json.NewEncoder(w).Encode(coords); err != nil {
		http. Error(w, err.Error(), 500)
	}
}
