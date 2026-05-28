package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

func HandleCoordinates(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()

	ctx := context.Background()
	dbURL := os.Getenv("DATABASE_URL")

	conn, err := pgx.Connect(ctx, dbURL)
	if err != nil {
		fmt.Println("Error connecting to database:", err)
		return
	}

	defer conn.Close(ctx)

	w.Write([]byte("connected!"))
}
