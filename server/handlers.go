package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func HandleCountries(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	rows, err := db.Query(ctx, "SELECT DISTINCT country FROM venues")
	if err != nil {
		fmt.Printf("Error querying countries", err)
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
//	ctx := r.Context()


	
	w.Write([]byte("connected!"))
}
