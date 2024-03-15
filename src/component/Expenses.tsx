import React, { useCallback, useEffect, useState } from "react";

import { v4 as uuid4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
type Expense = {
  id?: string;
  expenseSource: string;
  expenseAmount: number;
  expenseDate: string;
};
type getExpenseProp = {
  onGetExpense: (expense: number) => void;
};

export const Expense = (props: getExpenseProp) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Expense>();
  const notify = () => toast("income added successfully!");

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    props.onGetExpense(calculateTotalExpense());
  }, [expenses, props]);

  const calculateTotalExpense = useCallback(() => {
    return expenses.reduce(
      (total, expense) => total + expense.expenseAmount,
      0
    );
  }, [expenses]);

  const submitData: SubmitHandler<Expense> = (data) => {
    const updateExpense: Expense = { ...data, id: uuid4() };
    const newExpense = [...expenses, updateExpense];
    setExpenses(newExpense);
    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.expenseAmount,
      0
    );
    props.onGetExpense(totalExpenses);
    notify();
    reset();
  };

  const handleDelete = useCallback(
    (id: string | undefined) => {
      const deleteExpense = expenses.filter((expense) => expense.id !== id);
      setExpenses(deleteExpense);
    },
    [expenses]
  );

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="expense-source">
          <label htmlFor="source">Expense source</label>
          <input
            type="text"
            id="expense-source"
            placeholder="Electricity bill"
            {...register("expenseSource", {
              required: "expense source required",
            })}
          />
          {errors.expenseSource && <span>{errors.expenseSource.message}</span>}
        </div>
        <div className="expense-amount">
          <label htmlFor="amount">Amount of Expense </label>
          <input
            type="number"
            id="expense-amount"
            {...register("expenseAmount", {
              valueAsNumber: true,
              required: "expense amount required",
              min: { value: 0, message: "Enter valid amount" },
            })}
          />
          {errors.expenseAmount && <span>{errors.expenseAmount.message}</span>}
        </div>

        <div className="expense-date">
          <label htmlFor="date"> Date of Expense</label>
          <input
            type="date"
            id="expense-date"
            {...register("expenseDate", { required: "expense date required" })}
          />
          {errors.expenseDate && <span>{errors.expenseDate.message}</span>}
        </div>
        <button>add Expense</button>
      </form>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            return (
              <li className="list" key={expense.id}>
                {" "}
                {expense.expenseSource} :{expense.expenseAmount}EUR on{" "}
                {expense.expenseDate}
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
    </>
  );
};
