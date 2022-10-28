package entity

type Transaction struct {
	ID        int     `json:"id"`
	Title     string  `json:"title"`
	Value     float32 `json:"value"`
	IsDeposit bool    `json:"isDeposit"` // deposit = 1 (true)
	Category  string  `json:"category"`
	CreatedAt string  `json:"createdAt"`
}
