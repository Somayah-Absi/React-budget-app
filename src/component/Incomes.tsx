import React, { useCallback, useEffect, useState } from "react";
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

type OnGetIncomeProp = {
  onGetIncome: (income: number) => void;
};

export function Income(props: OnGetIncomeProp) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Income>();
  const notify = () => toast("Income added successfully!");

  useEffect(() => {
    props.onGetIncome(calculateTotalIncome());
  }, [incomes, props]);
  const calculateTotalIncome = useCallback(() => {
    return incomes.reduce((total, income) => total + income.incomeAmount, 0);
  }, [incomes]);

  const submitData: SubmitHandler<Income> = (data) => {
    const updatedIncome: Income = { ...data, id: uuid4() };

    const newIncomes = [...incomes, updatedIncome];
    setIncomes(newIncomes);

    const totalIncome = newIncomes.reduce(
      (total, income) => total + income.incomeAmount,
      0
    );
    props.onGetIncome(totalIncome);

    notify();
    reset();
  };

  const handleDelete = useCallback(
    (id: string) => {
      const filteredIncomes = incomes.filter((income) => income.id !== id);
      setIncomes(filteredIncomes);
    },
    [incomes]
  );

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
            <li className="list" key={income.id}>
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
