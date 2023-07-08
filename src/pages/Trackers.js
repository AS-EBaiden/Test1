import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

function Trackers() {
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleExpenseSubmit = (expense, id) => {
    if (id) {
      const updatedExpenses = expenses.map((item) =>
        item.id === id ? { ...item, ...expense } : item
      );
      setExpenses(updatedExpenses);
    } else {
      const newExpense = {
        ...expense,
        id: Date.now(),
        // id: expenses.length + 1,
        date: expense.date.toString(),
      };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toDateString();
    const hasExpense = expenses.some(
      (expense) => new Date(expense.date).toDateString() === formattedDate
    );
    return hasExpense ? <div className="expense-dot">•</div> : null;
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      new Date(expense.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="App">
      {/* <h1>Expense Tracker</h1> */}

      <div>
        <p>Trackers</p>
        <ExpenseForm onExpenseSubmit={handleExpenseSubmit} />
        <div>
          <div>
            <ReactCalendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
            />
          </div>
          <ul>
            {filteredExpenses.map((expense) => (
              <li key={expense.id}>{expense.description}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Trackers;
