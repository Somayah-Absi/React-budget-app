
import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid4 } from "uuid";
type expenseType={
id?:string;
source:string;
amount:number;
date:string;

}
type getExpenseType = {
  onGetExpense: (expense: number) => void;
};

export const Expense= (props:getExpenseType)=>{


const[expense,setExpense]=useState({
source:"",
amount:0,
date:""



})


  
  const [expenses,setExpenses]=useState<expenseType[]>([]);
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  props.onGetExpense(totalExpenses);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setExpense((prevExpense) => {
      return {
        ...prevExpense,
        [name]: name === "amount" ? parseFloat(value) : value,
      } as expenseType; 
    });
  };
 
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const{source,amount,date}=expense;

    if(source&&amount&&date){ 
      const newExpense = {
      id:uuid4(),
    ...expense
    };
   setExpenses((prevExpense)=>{
return [...prevExpense,newExpense]

   })
  setExpense({
    source: "",
    amount: 0,
    date: "",
  });  
  }else{
      console.log("nothing");
    }
   
  };
return (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="source">Expense source</label>
        <input type="text"name="source" placeholder="Electricity bill"onChange={handleChange} value={expense.source} id="source" required />
      </div>
      <div>
        <label htmlFor="amount">Amount of Expense </label>
        <input type="number"name="amount" onChange={handleChange}value={expense.amount} id="amount" required />
      </div>

      <div>
        <label htmlFor="date"> Date of Expense</label>
        <input type="date" onChange={handleChange}name="date" value={expense.date} id="date" />
      </div>
      <button>add Expense</button>
    </form>
    <ul>
      {expenses.length>0?
      expenses.map((expense)=>{
        return (
          <li key={expense.id}>
            {" "}
            {expense.source} :{expense.amount}EUR on {expense.date}
          </li>
        );
      }):<p>nothing here</p>}
    </ul>
  </div>
);



}