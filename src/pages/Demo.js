import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BudgetForm({ onBudgetSubmit }) {
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!budget) return;
    onBudgetSubmit(parseFloat(budget));
    setBudget("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        step="0.01"
        placeholder="Enter your budget..."
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}

function ExpenseForm({ onExpenseSubmit, expense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [receipt, setReceipt] = useState("");
  const [receiptPreview, setReceiptPreview] = useState("");

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount.toFixed(2));
      setDate(new Date(expense.date));
      setReceipt(expense.receipt);
      setReceiptPreview(expense.receiptPreview);
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    const newExpense = {
      description,
      amount: parseFloat(amount),
      date,
      receipt: receipt.name,
      receiptPreview,
    };
    onExpenseSubmit(newExpense, expense ? expense.id : null);
    setDescription("");
    setAmount("");
    setDate(new Date());
    setReceipt("");
    setReceiptPreview("");
  };

  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceipt(file);
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Enter amount..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <label>Date:</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <div>
        <label>Receipt:</label>
        <input type="file" onChange={handleReceiptChange} />
        {receiptPreview && (
          <div>
            <a href={receiptPreview} target="_blank" rel="noopener noreferrer">
              <img
                src={receiptPreview}
                alt="Receipt Thumbnail"
                width="80"
                height="80"
              />
            </a>
          </div>
        )}
      </div>
      <button type="submit">
        {expense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

function Demo() {
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expensesGenerated, setExpensesGenerated] = useState(0);

  const handleBudgetSubmit = (budget) => {
    setBudget(parseFloat(budget));
  };

  const handleExpenseSubmit = (expense, id) => {
    if (id) {
      const updatedExpenses = expenses.map((item) =>
        item.id === id ? { ...item, ...expense } : item
      );
      setExpenses(updatedExpenses);
      updateBudget(expense.amount - getExpenseAmountById(id));
    } else {
      const newExpense = {
        ...expense,
        id: Date.now(),
        // id: expenses.length + 1,
        date: expense.date.toString(),
      };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      updateBudget(-expense.amount);
    }
  };

  const updateBudget = (amount) => {
    const updatedBudget = budget + amount;
    setBudget(updatedBudget);
    if (updatedBudget <= 0 && expensesGenerated === 0) {
      alert("You have reached your budget limit!");
    }
  };

  const deleteExpense = (id, amount) => {
    const updatedExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(updatedExpenses);
    updateBudget(amount);
  };

  const generateMonthlyExpenses = () => {
    const monthlyAmount = budget / 12;
    const generatedExpenses = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      description: `Monthly Expense ${index + 1}`,
      amount: monthlyAmount,
      date: new Date().toString(),
      receipt: "",
      receiptPreview: "",
    }));
    setExpensesGenerated(12);
    setExpenses(generatedExpenses);
    setBudget(0);
  };

  const getExpenseAmountById = (id) => {
    const expense = expenses.find((item) => item.id === id);
    return expense ? expense.amount : 0;
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      {!budget && budget !== 0 ? (
        <BudgetForm onBudgetSubmit={handleBudgetSubmit} />
      ) : (
        <div>
          <p>Budget: ${budget.toFixed(2)}</p>
          <ExpenseForm onExpenseSubmit={handleExpenseSubmit} />
          <button onClick={generateMonthlyExpenses}>
            Generate Monthly Expenses
          </button>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                <p>
                  <strong>Description:</strong> {expense.description}
                </p>
                <p>
                  <strong>Amount:</strong> ${expense.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                {expense.receipt && (
                  <p>
                    <strong>Receipt:</strong>{" "}
                    <a
                      href={expense.receipt}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Receipt
                    </a>
                  </p>
                )}
                {expense.receiptPreview && (
                  <div>
                    <a
                      href={expense.receiptPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={expense.receiptPreview}
                        alt="Receipt Thumbnail"
                        width="80"
                        height="80"
                      />
                    </a>
                  </div>
                )}
                <button
                  onClick={() => deleteExpense(expense.id, expense.amount)}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleExpenseSubmit(expense, expense.id)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Demo;

// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function BudgetForm({ onBudgetSubmit }) {
//   const [budget, setBudget] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!budget) return;
//     onBudgetSubmit(parseInt(budget));
//     setBudget("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="number"
//         placeholder="Enter your budget..."
//         value={budget}
//         onChange={(e) => setBudget(e.target.value)}
//       />
//       <button type="submit">Set Budget</button>
//     </form>
//   );
// }

// function ExpenseForm({ onExpenseSubmit, expense }) {
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [receipt, setReceipt] = useState("");
//   const [receiptPreview, setReceiptPreview] = useState("");

//   useEffect(() => {
//     if (expense) {
//       setDescription(expense.description);
//       setAmount(expense.amount.toString());
//       setDate(new Date(expense.date));
//       setReceipt(expense.receipt);
//       setReceiptPreview(expense.receiptPreview);
//     }
//   }, [expense]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!description || !amount) return;
//     const newExpense = {
//       id: expense ? expense.id : Date.now(), // Assign a unique identifier
//       description,
//       amount: parseInt(amount),
//       date,
//       receipt: receipt.name,
//       receiptPreview,
//     };
//     console.log("expense", expense);
//     onExpenseSubmit(newExpense, expense ? expense.id : null);
//     setDescription("");
//     setAmount("");
//     setDate(new Date());
//     setReceipt("");
//     setReceiptPreview("");
//   };

//   const handleReceiptChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setReceipt(file);
//       setReceiptPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter description..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Enter amount..."
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <div>
//         <label>Date:</label>
//         <DatePicker selected={date} onChange={(date) => setDate(date)} />
//       </div>
//       <div>
//         <label>Receipt:</label>
//         <input type="file" onChange={handleReceiptChange} />
//         {receiptPreview && (
//           <div>
//             <a href={receiptPreview} target="_blank" rel="noopener noreferrer">
//               <img
//                 src={receiptPreview}
//                 alt="Receipt Thumbnail"
//                 width="80"
//                 height="80"
//               />
//             </a>
//           </div>
//         )}
//       </div>
//       <button type="submit">
//         {expense ? "Update Expense" : "Add Expense"}
//       </button>
//     </form>
//   );
// }

// function Demo() {
//   const [budget, setBudget] = useState(null);
//   const [expenses, setExpenses] = useState([]);

//   const handleBudgetSubmit = (budget) => {
//     setBudget(budget);
//   };

//   const handleExpenseSubmit = (expense, id) => {
//     if (id) {
//       const updatedExpenses = expenses.map((item) =>
//         item.id === id ? { ...item, ...expense } : item
//       );
//       setExpenses(updatedExpenses);
//       updateBudget(expense.amount - getExpenseAmountById(id));
//     } else {
//       const newExpense = {
//         ...expense,
//         // id: expenses.length + 1,
//         id: Date.now(),
//         date: expense.date.toString(),
//       };
//       const updatedExpenses = [...expenses, newExpense];
//       setExpenses(updatedExpenses);
//       updateBudget(-expense.amount);
//     }
//   };

//   const updateBudget = (amount) => {
//     const updatedBudget = budget + amount;
//     setBudget(updatedBudget);
//     if (updatedBudget <= 0) {
//       alert("You have reached your budget limit!");
//     }
//   };

//   const deleteExpense = (id) => {
//     const amount = getExpenseAmountById(id);
//     const updatedExpenses = expenses.filter((item) => item.id !== id);
//     setExpenses(updatedExpenses);
//     updateBudget(amount);
//   };

//   const getExpenseAmountById = (id) => {
//     const expense = expenses.find((item) => item.id === id);
//     return expense ? expense.amount : 0;
//   };

//   return (
//     <div className="App">
//       <h1>Expense Tracker</h1>
//       {!budget && budget !== 0 ? (
//         <BudgetForm onBudgetSubmit={handleBudgetSubmit} />
//       ) : (
//         <div>
//           <p>Budget: ${budget}</p>
//           <ExpenseForm onExpenseSubmit={handleExpenseSubmit} />
//           <ul>
//             {expenses.map((expense) => (
//               <li key={expense.id}>
//                 <p>
//                   <strong>Description:</strong> {expense.description}
//                 </p>
//                 <p>
//                   <strong>Amount:</strong> ${expense.amount}
//                 </p>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(expense.date).toLocaleDateString()}
//                 </p>
//                 {expense.receipt && (
//                   <p>
//                     <strong>Receipt:</strong>{" "}
//                     <a
//                       href={expense.receipt}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       View Receipt
//                     </a>
//                   </p>
//                 )}
//                 {expense.receiptPreview && (
//                   <div>
//                     <a
//                       href={expense.receiptPreview}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img
//                         src={expense.receiptPreview}
//                         alt="Receipt Thumbnail"
//                         width="80"
//                         height="80"
//                       />
//                     </a>
//                   </div>
//                 )}
//                 <button onClick={() => deleteExpense(expense.id)}>
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleExpenseSubmit(expense, expense.id)}
//                 >
//                   Edit
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Demo;
