import React from "react";

export const Expense= ()=>{
return (
  <div>
    <form>
      <div>
        <label htmlFor="source">Expense source</label>
        <input type="text" placeholder="Electricity bill" id="source" required />
      </div>
      <div>
        <label htmlFor="amount">Amount of Expense </label>
        <input type="number" id="amount" required />
      </div>

      <div>
        <label htmlFor="date"> Date of Income </label>
        <input type="date" id="date" />
      </div>
      <button>add income</button>
    </form>
  </div>
);



}