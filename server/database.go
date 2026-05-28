package main

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() {
	dbURL := os.Getenv("DATABASE_URL")

	var err error
	DB, err = pgxpool.New(context.Background(), dbURL)
	if err != nil {
		panic(fmt.Errorf("Error connecting to database: %w", err))
	}

	fmt.Println("Connected to database")
}
