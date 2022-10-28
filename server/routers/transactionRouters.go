package routers

import (
	"api/aemoney/controllers"

	"github.com/gofiber/fiber/v2"
)

func InitialiseHandlers(app *fiber.App) {
	app.Get("/api/transaction/:id", controllers.GetTransactionByID)
	app.Get("/api/transactions", controllers.GetAllTransaction)
	app.Post("/api/transaction", controllers.CreateTransaction)
	app.Put("/api/transaction/:id", controllers.UpdateTransactionByID)
	app.Delete("/api/transaction/:id", controllers.DeleteTransactionByID)
}
