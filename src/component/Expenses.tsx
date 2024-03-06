import React, { ChangeEvent, FormEvent, useState } from "react";

export const Expense= ()=>{

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const handleSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSource(value);
  };
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAmount(Number(value));
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDate(value);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newIncome = {
      source: source,
      amount: amount,
      date: date,
    };
    console.log(newIncome);
  };
return (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="source">Expense source</label>
        <input type="text" placeholder="Electricity bill"onChange={handleSourceChange} id="source" required />
      </div>
      <div>
        <label htmlFor="amount">Amount of Expense </label>
        <input type="number"onChange={handleAmountChange} id="amount" required />
      </div>

      <div>
        <label htmlFor="date"> Date of Expense</label>
        <input type="date" onChange={handleDateChange} id="date" />
      </div>
      <button>add Expense</button>
    </form>
  </div>
);



}