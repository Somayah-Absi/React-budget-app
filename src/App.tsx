import React from "react";

import { Income } from "./component/income";
import { Expense } from "./component/expense";
import { SetTarget } from "./component/target";
import { Transfer } from "./component/transfer";
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
