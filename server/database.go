package main

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

func Initdb() {
	dbURL := os.Getenv("DATABASE_URL")

	var err error
	
	db, err = pgxpool.New(context.Background(), dbURL)
	if err != nil {
		panic(fmt.Errorf("Error connecting to database: %w", err))
	}

	fmt.Println("Connected to database")
}
