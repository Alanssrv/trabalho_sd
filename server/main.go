package main

import (
	"api/aemoney/database"
	"api/aemoney/routers"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

const port = ":8090"

func main() {

	initDB()

	log.Println("Starting http in", port)

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	routers.InitialiseHandlers(app)
	log.Fatal(app.Listen(port))
}

func initDB() {
	// config :=
	// 	database.Config{
	// 		ServerName: "localhost:3306",
	// 		User:       "user",
	// 		Password:   "password",
	// 		DB:         "wallet",
	// 	}

	//connectionString := database.GetConnectionString(config)
	err := database.Connect("user:password@tcp(database)/wallet")
	if err != nil {
		panic(err.Error())
	}
}
