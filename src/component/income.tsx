import React, { ChangeEvent, FormEvent, useState } from "react";

export function Incomes() {
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
const handleSubmit=(event:FormEvent)=>{
event.preventDefault();
const newIncome={
source:source,
amount:amount,
date:date


}
console.log(newIncome);
}

  return (
    <div className="income-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="source">Income source</label>
          <input
            type="text"
            onChange={handleSourceChange}
            placeholder="salary"
            id="source"
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of Income </label>
          <input type="number"onChange={handleAmountChange} id="amount" required />
        </div>

        <div>
          <label htmlFor="date"> Date of Income </label>
          <input type="date" id="date" />
        </div>
        <button>add Income</button>
      </form>
    </div>
  );
}
