import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { v4 as uuid4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type expenseType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};
type getExpenseType = {
  onGetExpense: (expense: number) => void;
};

export const Expense = (props: getExpenseType) => {
  const [expense, setExpense] = useState({
    source: "",
    amount: 0,
    date: "",
  });
const notify = () => toast("income added successfully!");

  const [expenses, setExpenses] = useState<expenseType[]>([]);
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleDelete = (id: string | undefined) => {
    const deleteExpense = expenses.filter((expense) => expense.id !== id);
    setExpenses(deleteExpense);
  };
  useEffect(() => {
    props.onGetExpense(totalExpenses);
  }, [expenses, props, totalExpenses]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: name === "amount" ? +value : value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { source, amount, date } = expense;

    if (source && amount && date) {
      if(amount>0){ 
        const newExpense = {
        id: uuid4(),
        ...expense,
      };
      setExpenses((prevExpense) => {
        return [...prevExpense, newExpense];
      });
      setExpense({
        source: "",
        amount: 0,
        date: "",
      });
      notify();
    }else{
      toast.error("Insufficient balance!");
    }
  
  }
      else {
    toast.error("please enter your expense");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="source">
          <label htmlFor="source">Expense source</label>
          <input
            type="text"
            name="source"
            placeholder="Electricity bill"
            onChange={handleChange}
            value={expense.source}
            id="source"
            required
          />
        </div>
        <div className="amount">
          <label htmlFor="amount">Amount of Expense </label>
          <input
            type="number"
            name="amount"
            onChange={handleChange}
            value={expense.amount}
            id="amount"
            required
          />
        </div>

        <div className="date">
          <label htmlFor="date"> Date of Expense</label>
          <input
            type="date"
            onChange={handleChange}
            name="date"
            value={expense.date}
            id="date"
          />
        </div>
        <button>add Expense</button>
      </form>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            return (
              <li key={expense.id}>
                {" "}
                {expense.source} :{expense.amount}EUR on {expense.date}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(expense.id)}
                >
                  delete
                </button>
              </li>
            );
          })
        ) : (
          <p>nothing here</p>
        )}
      </ul>
      <ToastContainer />
    </div>
  );
};
