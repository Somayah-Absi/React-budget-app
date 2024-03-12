import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";

type Target = {
  getAmount: number;
};
type ResetInput = {
  targetAmount: number;
};
export const SetTarget = (props: Target) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetInput>();
  const [totalAmount, setTotalAmount] = useState(props.getAmount);
  const [target, setTarget] = useState(0);
  useEffect(() => {
    setTotalAmount(props.getAmount);
  }, [props.getAmount]);
  const resetSubmit: SubmitHandler<ResetInput> = (data) => {
    const targetAmount = data.targetAmount;
    setTarget(targetAmount);
  };
  const percentage = target !== 0 ? (totalAmount / target) * 100 : 0;

  return (
    <>
      <form onSubmit={handleSubmit(resetSubmit)}>
        <>
          <FontAwesomeIcon
            icon={faSackDollar}
            style={{ color: "#FFD43B", fontSize: "24px" }}
          />
          <label htmlFor="target"> Set Target</label>
          <input
            type="number"
            id="target"
            {...register("targetAmount", {
              valueAsNumber: true,
              required: "enter your target",
              min: { value: 0, message: "enter valid amount" },
            })}
          />
          {errors.targetAmount && <span>{errors.targetAmount.message}</span>}
        </>

        <button>Reset</button>
      </form>

      <p>current saving: {totalAmount}</p>
      <p>Target:{target}</p>

      <p>
        progress : {percentage}%
        <progress max={target} value={totalAmount} />
      </p>
      <ToastContainer />
    </>
  );
};
