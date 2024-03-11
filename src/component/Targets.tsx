import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Target = {
  getAmount: number;
};
export const SetTarget = (props: Target) => {
  const [totalAmount, setTotalAmount] = useState(props.getAmount);
  const [targets, setTargets] = useState(0);
  const [target, setTarget] = useState(0);
  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTargets(Number(value));
  };

  useEffect(() => {
    setTotalAmount(props.getAmount);
  }, [props.getAmount]);

  const handleForm = (event: FormEvent) => {
    event.preventDefault();

    if (targets > 0) {
      setTarget(targets);
    } else {
      toast.error("Enter a positive target");
    }
  };
  const percentage = target !== 0 ? (totalAmount / target) * 100 : 0;

  return (
    <>
      <form onSubmit={handleForm}>
        <>
          <FontAwesomeIcon
            icon={faSackDollar}
            style={{ color: "#FFD43B", fontSize: "24px" }}
          />
          <label htmlFor="target"> Set Target</label>
          <input type="number" onChange={handleTarget} id="target" required />
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
