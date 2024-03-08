import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
type IncomeType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};
type onGetIncomeType = {
  onGetIncome: (income: number) => void;
};
export function Income(props: onGetIncomeType) {
  const [income, setIncome] = useState({
    source: "",
    amount: 0,
    date: "",
  });

  const [incomes, setIncomes] = useState<IncomeType[]>([]);
const totalIncomes = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );

  useEffect(()=>{


  props.onGetIncome(totalIncomes);
  },[incomes,totalIncomes,props]);
  



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setIncome((prevIncome) => ({
      ...prevIncome,
      [name]: name === "amount" ? +value : value,
    }));
  };

const handleDelete=(id:string| undefined)=>{
const deleteIncome= incomes.filter((income)=>income.id!==id)
setIncomes(deleteIncome)

}


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
     const { source, amount, date } = income;
    if (source && amount && date) {
      const newIncome = {
        id: uuid4(),
        ...income,
      };
setIncomes((prevIncome) => {
  return [...prevIncome, newIncome ];
});



      setIncome({ source: "", amount: 0, date: "" });
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="income-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="source">Income source</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="salary"
            value={income.source}
            id="source"
            name="source"
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of Income </label>
          <input
            type="number"
           
            id="amount"
            name="amount"
             onChange={handleChange}
            value={income.amount}
            required
          />
        </div>

        <div>
          <label htmlFor="date"> Date of Income </label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={income.date}
            id="date"
          />
        </div>
        <button>add Income</button>
      </form>
      <ul>
       {incomes.length>0?
      incomes.map((income)=>{
        return (
          <li key={income.id}>
            {" "}
            {income.source} :{income.amount}EUR on {income.date} 
            <button onClick={()=>handleDelete(income.id)}>delete</button>
          </li>
        
        ); 
      }):<p>nothing here</p>}
       
      </ul>
    </div>
  );
}
