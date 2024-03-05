import React from "react";
export function Incomes() {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="source">Income source</label>
          <input type="text" placeholder="salary" id="source" required />
        </div>
        <div>
          <label htmlFor="amount">Amount of Income </label>
          <input type="number" id="amount" required />
        </div>

        <div>
          <label htmlFor="date"> Date of Expense </label>
          <input type="date" id="date" />
        </div>
        <button>add Expense</button>
      </form>
    </div>
  );
}
