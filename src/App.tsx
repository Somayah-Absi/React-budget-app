import React, { useState } from "react";

import { Income } from "./component/Incomes";
import { Expense } from "./component/Expenses";
import { SetTarget } from "./component/Targets";
import { Transfer } from "./component/Transfers";
import "./App.css";



function App() {
  const [transferAmount,setTransferAmount]=useState(0);
const [incomeAmount,setIncomeAmount]=useState(0);
const [expenseAmount, setExpenseAmount] = useState(0);
  
  const getIncome=(income:number)=>{
setIncomeAmount(income);
  }
  const getExpense = (expense: number) => {
    setExpenseAmount(expense);
  };


  const getTransfer=(amount:number)=>{
    setTransferAmount(amount);

  }
  return (
    <div className="container">
    <Income onGetIncome={getIncome} />
      <Expense onGetExpense={getExpense}/>
      <SetTarget getAmount={transferAmount} />
      <Transfer onGetTransfer={getTransfer}
      getIncomeAmount={incomeAmount}
      getExpense={expenseAmount}/>
      
    </div>
  );
}

export default App;
