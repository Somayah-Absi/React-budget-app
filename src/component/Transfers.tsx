import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Message = {
  onGetTransfer: (amount: number) => void;
  getIncomeAmount: number;
  getExpense: number;
};

export const Transfer = (props: Message) => {
  const notify = () => toast("Target set successfully!");
  const [transfers, setTransfer] = useState<number>(0);

  const currentBalance = props.getIncomeAmount - props.getExpense - transfers;

  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTransfer(Number(value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (transfers <= 0) {
      toast.error("Please enter a valid transfer amount!");
    } else if (currentBalance - transfers < 0) {
      toast.error("Insufficient balance for transfer!");
    } else {
      props.onGetTransfer(transfers);
      notify();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <>
          <p>current balance: {currentBalance}</p>
          <label htmlFor="transfer">Transfer to saving account</label>
          <input
            type="number"
            onChange={handleTransfer}
            value={transfers}
            id="transfer"
            required
          />
        </>
        <button>Transfer</button>
      </form>
      <ToastContainer />
    </>
  );
};
