import React, { useCallback, useState } from "react";
import { Income } from "./Incomes";
import { Expense } from "./Expenses";
import { SetTarget } from "./Targets";
import { Transfer } from "./Transfers";

export const Budget = () => {
  const [transferAmount, setTransferAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const getIncome = useCallback((income: number) => {
    setIncomeAmount(income);
  }, []);

  const getExpense = useCallback((expense: number) => {
    setExpenseAmount(expense);
  }, []);

  const getTransfer = useCallback((amount: number) => {
    const newTransferAmount = transferAmount + amount;
    setTransferAmount(newTransferAmount);
    setTotalSavings(totalSavings + amount);
  }, []);
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
};
