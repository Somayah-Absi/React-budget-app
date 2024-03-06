import React from "react";

import { Incomes } from "./component/Income";
import { Expense } from "./component/Expense";
import { SetTarget } from "./component/Target";
import { Transfer } from "./component/Transfer";
import "./App.css";
function App() {
  return (
    <div className="container">
      <Incomes />
      <Expense />
      <SetTarget />
      <Transfer />
      
    </div>
  );
}

export default App;
