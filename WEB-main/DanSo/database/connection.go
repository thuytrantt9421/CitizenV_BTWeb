package database

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

const (
	user     = "root"
	password = ""
	host     = "127.0.0.1:3306"
	database = "web"
)

func Connect() (db *sql.DB) {
	dsn := user + ":" + password + "@tcp(" + host + ")/" + database
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Println("Could not connect to database:", err)
	}
	return db
}
