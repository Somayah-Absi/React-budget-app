import React from "react";

import { Incomes } from "./component/income";
import { Expense } from "./component/expense";
import { SetTarget } from "./component/target";
import { Transfer } from "./component/transfer";

function App() {
  return (
    <div >
      <Incomes />
      <Expense />
      <SetTarget />
      <Transfer />
    </div>
  );
}

export default App;
