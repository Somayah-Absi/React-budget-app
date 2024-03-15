import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Message = {
  onGetTransfer: (amount: number) => void;
  getIncomeAmount: number;
  getExpense: number;
};
type Input = {
  transferAmount: number;
};

export const Transfer = (props: Message) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Input>();
  const notify = () => toast("Target set successfully!");
  const [transfers, setTransfer] = useState<number>(0);

  const currentBalance = props.getIncomeAmount - props.getExpense - transfers;

  const submitData: SubmitHandler<Input> = (data) => {
    const transferAmount = data.transferAmount;

    if (currentBalance - transferAmount < 0) {
      toast.error("Insufficient balance for transfer!");
    } else {
      setTransfer((prevTransfer) => prevTransfer + transferAmount);

      props.onGetTransfer(transferAmount);
      notify();
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <>
          <p>current balance: {currentBalance}</p>
          <label htmlFor="transfer">Transfer to saving account</label>
          <input
            type="number"
            {...register("transferAmount", {
              valueAsNumber: true,
              required: "transfer amount required",
              min: { value: 0, message: "enter valid amount" },
            })}
            id="transfer"
          />
          {errors.transferAmount && (
            <span>{errors.transferAmount.message}</span>
          )}
        </>
        <button>Transfer</button>
      </form>
      <ToastContainer />
    </>
  );
};
