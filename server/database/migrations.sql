CREATE TABLE `Transaction` (
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Title VARCHAR(255) NOT NULL,
	`Value` DECIMAL(15, 2) NOT NULL,
	Category VARCHAR(255) NOT NULL,
	IsDeposit BOOLEAN NOT NULL,
	CreatedAt DATETIME NOT NULL,
	DeletionDate DATETIME
);

CREATE PROCEDURE `GetAllTransactions`() BEGIN 
	SELECT * FROM `Transaction` WHERE DeletionDate IS NULL;
END; 

CREATE PROCEDURE `GetTransactionById`(paramID INT) 
BEGIN 
	SELECT *
	FROM `Transaction`
	WHERE
		DeletionDate IS NULL
		AND ID = paramID;
END; 

CREATE PROCEDURE `InsertTransaction`(paramTitle VARCHAR
(255), paramValue DECIMAL(15, 2), paramCategory VARCHAR
(255), paramIsDeposit BOOLEAN) BEGIN 
	INSERT INTO
		`Transaction` (
			Title,
			`Value`,
			Category,
			IsDeposit,
			CreatedAt,
			DeletionDate
		)
	VALUES (
			paramTitle,
			paramValue,
			paramCategory,
			paramIsDeposit,
			NOW(),
			NULL
		);
END; 

CREATE PROCEDURE `UpdateTransaction`(paramID INT, paramTitle 
VARCHAR(255), paramValue DECIMAL(15, 2), paramCategory 
VARCHAR(255), paramIsDeposit BOOLEAN) BEGIN 
	UPDATE `Transaction`
	SET
		Title = paramTitle,
		`Value` = paramValue,
		Category = paramCategory,
		IsDeposit = paramIsDeposit
	WHERE ID = paramID;
END; 

CREATE PROCEDURE `DeleteTransactionByID`(paramID INT
) BEGIN 
	UPDATE `Transaction`
	SET DeletionDate = NOW()
	WHERE ID = paramID;
END; 
