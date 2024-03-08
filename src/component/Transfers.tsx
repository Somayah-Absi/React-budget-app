import React, { ChangeEvent, FormEvent, useState } from "react";

type message = {
  onGetTransfer: (amount: number) => void;
  getIncomeAmount: number;
  getExpense: number;
};

export const Transfer = (props: message) => {
  const [transfers, setTransfer] = useState(0);

  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTransfer(Number(value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onGetTransfer(transfers);
  };
  const balance = () => {
    return props.getIncomeAmount - props.getExpense - transfers;
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
    </div>
  );
};
