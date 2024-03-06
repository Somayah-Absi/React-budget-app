import React from "react";

export const SetTarget=()=>{
return (
  <div>
    <form>
      <div>
        <label htmlFor="target">Set Target</label>
        <input type="number" id="target" required />
      </div>
      <button>Reset</button>
    </form>
    <p>current saving: 0</p>
    <p>Target: 0</p>
    <p>progress : 0% <progress max={3000} value={0}/></p>
  </div>
);


}