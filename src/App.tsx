import React from "react";

import { Income } from "./component/Incomes";
import { Expense } from "./component/Expenses";
import { SetTarget } from "./component/Targets";
import { Transfer } from "./component/Transfers";
import "./App.css";



function App() {
  return (
    <div className="container">
    <Income/>
      <Expense />
      <SetTarget />
      <Transfer />
      
    </div>
  );
}

export default App;
