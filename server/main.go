package main

import (
	"fmt"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("No .env file found (that's fine)")
	}

	Initdb()
	defer db.Close()

	http.HandleFunc("/api/countries", HandleCountries)
	http.HandleFunc("/api/coordinates", HandleCoordinates)

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error serving:", err)
		return
	}
}
