package main

import (
	"fmt"
	"log"
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

	server := http.NewServeMux()
	server.HandleFunc("/api/countries", HandleCountries)
	server.HandleFunc("/api/coordinates", HandleCoordinates)

	fmt.Println("Server running on http://localhost:8080")

	err = http.ListenAndServe(":8080", server)
	if err != nil {
		log.Fatal("Error serving:", err)
		return
	}
}
