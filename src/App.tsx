import React, { useState } from "react";

import { Income } from "./component/Incomes";
import { Expense } from "./component/Expenses";
import { SetTarget } from "./component/Targets";
import { Transfer } from "./component/Transfers";
import "./App.css";

function App() {
  const [transferAmount, setTransferAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const getIncome = (income: number) => {
    setIncomeAmount(income);
  };
  const getExpense = (expense: number) => {
    setExpenseAmount(expense);
  };

  const getTransfer = (amount: number) => {
    const newTransferAmount = transferAmount + amount;
    setTransferAmount(newTransferAmount);
    setTotalSavings(totalSavings + amount);
  };

  return (
    <article>
      <div className="container">
        <div className="income-style">
          <Income onGetIncome={getIncome} />
        </div>
        <div className="expense-style">
          <Expense onGetExpense={getExpense} />
        </div>
        <div className="target-style">
          <SetTarget getAmount={transferAmount} />
        </div>
        <div className="transfer-style">
          <Transfer
            onGetTransfer={getTransfer}
            getIncomeAmount={incomeAmount}
            getExpense={expenseAmount}
          />
        </div>
      </div>
    </article>
  );
}

export default App;
