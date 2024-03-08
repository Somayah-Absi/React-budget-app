import React, { ChangeEvent, FormEvent, useState } from "react";
type targetType = {
  getAmount: number;
};
export const SetTarget = (props: targetType) => {
  // this will come from transfer component
  //  const calculatePercentage = () => {
  //    return (transfers / totalBalance) * 100;
  //  };
  const [targets, setTargets] = useState(0);
  const [target, setTarget] = useState(0);
  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTargets(Number(value));
  };
  const handleForm = (event: FormEvent) => {
    event.preventDefault();

    if (targets) {
      setTarget(targets);
    } else {
      console.log("no target");
    }

    setTargets(0);
  };
  const percentage = target !== 0 ? (props.getAmount / target) * 100 : 0;

  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="target">Set Target</label>
          <input type="number" onChange={handleTarget} id="target" required />
        </div>
        <button>Reset</button>
      </form>
      {/* will be in variable */}
      <p>current saving: {props.getAmount}</p>
      <p>Target:{target}</p>

      <p>
        progress : {percentage}%
        <progress max={target} value={percentage} />
      </p>
    </div>
  );
};
