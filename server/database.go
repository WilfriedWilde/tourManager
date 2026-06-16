package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

func Initdb() {
	dbURL := os.Getenv("DATABASE_URL")

	var err error
	
	db, err = pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatal(fmt.Errorf("Error connecting to database: %w", err))
	}

	fmt.Println("Connected to database")
}
