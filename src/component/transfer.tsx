import React from "react";

export const Transfer=()=>{
return(
<div> 
 <form>
      <div>
        <p>current balance: 0</p>
        <label htmlFor="transfer">Transfer to saving account</label>
        <input type="number" id="transfer" required />
      </div>
      <button>Transfer</button>
    </form>
    
  </div>

);



}