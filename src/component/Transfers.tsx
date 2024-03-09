import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type message = {
  onGetTransfer: (amount: number) => void;
  getIncomeAmount: number;
  getExpense: number;
};

export const Transfer = (props: message) => {
  const notify = () => toast("Target set successfully!");

  const [transfers, setTransfer] = useState<number>(0);

  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTransfer(Number(value));
  };

 const balance=()=>{
   const currentBalance = props.getIncomeAmount - props.getExpense - transfers;
   return currentBalance;
 }
   

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    

    if (transfers <= 0) {
      toast.error("Please enter a valid transfer amount!");
    } else {const currentBalance = props.getIncomeAmount - props.getExpense - transfers;
      if (currentBalance < 0) {
        toast.error("Insufficient balance for transfer!");
      } else {
        props.onGetTransfer(transfers);
        setTransfer(0); // Reset transfers to zero after successful transfer
        notify();
      }
    }
  };
  return (
    <div className="transfer-container">
      <form onSubmit={handleSubmit}>
        <div>
          <p>current balance: {balance()}</p>
          <label htmlFor="transfer">Transfer to saving account</label>
          <input
            type="number"
            onChange={handleTransfer}
            value={transfers}
            id="transfer"
            required
          />
        </div>
        <button>Transfer</button>
      </form>
      <ToastContainer />
    </div>
  );
};
