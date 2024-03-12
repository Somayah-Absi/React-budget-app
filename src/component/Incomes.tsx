import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";

type Income = {
  id: string;
  incomeSource: string;
  incomeAmount: number;
  incomeDate: string;
};

type OnGetIncomeType = {
  onGetIncome: (income: number) => void;
};

export function Income(props: OnGetIncomeType) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Income>();
  const notify = () => toast("Income added successfully!");

  useEffect(() => {
    const totalIncome = incomes.reduce(
      (total, income) => total + income.incomeAmount,
      0
    );
    props.onGetIncome(totalIncome);
  }, [incomes, props]);

  const submitData: SubmitHandler<Income> = (data) => {
    // Create a new income object with the updated incomeAmount
    const updatedIncome: Income = { ...data, id: uuid4() };

    // Add the updated income to the incomes array
    const newIncomes = [...incomes, updatedIncome];
    setIncomes(newIncomes);

    // Update total income by summing income amounts from newIncomes
    const totalIncome = newIncomes.reduce(
      (total, income) => total + income.incomeAmount,
      0
    );
    props.onGetIncome(totalIncome);

    notify();
    reset(); // Reset form fields after submission
  };

  const handleDelete = (id: string) => {
    const filteredIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(filteredIncomes);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="income-source">
          <label htmlFor="source">Income source</label>
          <input
            type="text"
            placeholder="Salary"
            id="income-source"
            {...register("incomeSource", { required: "Enter income source" })}
          />
          {errors.incomeSource && <span>{errors.incomeSource.message}</span>}
        </div>
        <div className="income-amount">
          <label htmlFor="amount">Amount of Income </label>
          <input
            type="number"
            id="income-amount"
            {...register("incomeAmount", {
              valueAsNumber: true,
              required: "Enter income amount",
              min: { value: 0, message: "Enter valid amount" },
            })}
          />
          {errors.incomeAmount && <span>{errors.incomeAmount.message}</span>}
        </div>

        <div className="income-date">
          <label htmlFor="date"> Date of Income </label>
          <input
            type="date"
            {...register("incomeDate", { required: "Enter income date" })}
            id="income-date"
          />
          {errors.incomeDate && <span>{errors.incomeDate.message}</span>}
        </div>
        <button type="submit">Add Income</button>
      </form>
      <ul>
        {incomes.length > 0 ? (
          incomes.map((income) => (
            <li key={income.id}>
              {income.incomeSource} : {income.incomeAmount} EUR on{" "}
              {income.incomeDate}
              <button
                className="delete-button"
                onClick={() => handleDelete(income.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>Nothing here</p>
        )}
      </ul>
      <ToastContainer />
    </>
  );
}
