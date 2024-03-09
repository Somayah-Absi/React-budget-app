import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
type targetType = {
  getAmount: number;
};
export const SetTarget = (props: targetType) => {
  const [totalAmount, setTotalAmount] = useState(props.getAmount);
  const [targets, setTargets] = useState(0);
  const [target, setTarget] = useState(0);
  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTargets(Number(value));
  };
  useEffect(() => {
    setTotalAmount((prevTotal) => prevTotal + props.getAmount);
  }, [props.getAmount]);

  const handleForm = (event: FormEvent) => {
    event.preventDefault();

    if (targets) {
      setTarget(targets);
      setTotalAmount((prevTotal) => prevTotal + targets);
    } else {
      console.log("no target");
    }
  };
  const percentage = target !== 0 ? (totalAmount / target) * 100 : 0;

  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="target">Set Target</label>
          <input type="number" onChange={handleTarget} id="target" required />
        </div>
        <button>Reset</button>
      </form>

      <p>current saving: {totalAmount}</p>
      <p>Target:{target}</p>

      <p>
        progress : {percentage}%
        <progress max={target} value={totalAmount} />
      </p>
    </div>
  );
};
