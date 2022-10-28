package controllers

import (
	"api/aemoney/database"
	"api/aemoney/entity"
	"fmt"
	"strconv"

	"github.com/blockloop/scan"
	"github.com/gofiber/fiber/v2"
)

func CreateTransaction(c *fiber.Ctx) error {
	sql_cmd := "INSERT INTO `Transaction` (Title, `Value`, Category, IsDeposit, CreatedAt, DeletionDate) VALUES (?, ?, ?, ?, NOW(), NULL);"

	stmt, err := database.Connector.Prepare(sql_cmd)
	if err != nil {
		panic(err.Error())
	}

	transaction := &entity.Transaction{}
	c.BodyParser(transaction)

	_, err = stmt.Exec(transaction.Title, transaction.Value, transaction.Category, transaction.IsDeposit)
	if err != nil {
		panic(err.Error())
	}

	err = c.SendString("Created transaction")

	return err
}

func GetAllTransaction(c *fiber.Ctx) error {
	var transactions []entity.Transaction

	sql_cmd := "SELECT * FROM `Transaction` WHERE DeletionDate IS NULL;"

	result, err := database.Connector.Query(sql_cmd)
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()
	err = scan.Rows(&transactions, result)
	if err != nil {
		panic(err.Error())
	}

	err = c.JSON(transactions)

	return err

}

func GetTransactionByID(c *fiber.Ctx) error {

	id, err := c.ParamsInt("id")
	if err != nil {
		panic(err.Error())
	}

	var transaction = InternalGetTransactionByID(strconv.Itoa(id))

	if (transaction == entity.Transaction{}) {
		return c.Status(404).SendString("Transaction not found")
	} else {
		err = c.JSON(transaction)
		return err
	}
}

func UpdateTransactionByID(c *fiber.Ctx) error {

	id, err := c.ParamsInt("id")
	if err != nil {
		panic(err.Error())
	}

	var baseTransaction = InternalGetTransactionByID(strconv.Itoa(id))

	if (baseTransaction != entity.Transaction{}) {
		sql_cmd := "UPDATE `Transaction` SET Title = ?, `Value` = ?, Category = ?, IsDeposit = ? WHERE ID = ?;"
		stmt, err := database.Connector.Prepare(sql_cmd)
		if err != nil {
			panic(err.Error())
		}

		transaction := &entity.Transaction{}
		c.BodyParser(transaction)

		title := transaction.Title
		value := transaction.Value
		isDeposit := transaction.IsDeposit
		category := transaction.Category

		_, err = stmt.Exec(baseTransaction.ID, title, value, category, isDeposit)
		if err != nil {
			panic(err.Error())
		}

		response := fmt.Sprintf("Transaction %d updated", baseTransaction.ID)
		err = c.SendString(response)

		return err

	} else {
		return c.Status(404).SendString("Transaction not found")
	}
}

func DeleteTransactionByID(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		panic(err.Error())
	}

	var transaction = InternalGetTransactionByID(strconv.Itoa(id))

	if (transaction != entity.Transaction{}) {
		sql_cmd := "UPDATE `Transaction` SET DeletionDate = NOW() WHERE ID = ?;"
		stmt, err := database.Connector.Prepare(sql_cmd)
		if err != nil {
			panic(err.Error())
		}

		_, err = stmt.Exec(transaction.ID)
		if err != nil {
			panic(err.Error())
		}

		result := fmt.Sprintf("Post with ID = %d was deleted", transaction.ID)
		err = c.SendString(result)

		return err
	} else {
		return c.Status(404).SendString("Transaction not found")
	}
}

func InternalGetTransactionByID(id string) entity.Transaction {
	sql_cmd := "SELECT * FROM `Transaction` WHERE DeletionDate IS NULL AND ID = ?;"

	result, err := database.Connector.Query(sql_cmd, id)
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var transaction entity.Transaction
	defer result.Close()

	_ = scan.Row(&transaction, result)

	return transaction
}
