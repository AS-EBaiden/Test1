import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

function EmotionLogger({ selectedDate, onEmotionLog }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const handleEmotionToggle = (emotion) => {
    if (selectedEmotions.find((e) => e.name === emotion)) {
      setSelectedEmotions(selectedEmotions.filter((e) => e.name !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, { name: emotion, level: 0 }]);
    }
  };

  const handleEmotionLevelChange = (emotion, level) => {
    setSelectedEmotions((prevEmotions) =>
      prevEmotions.map((e) => (e.name === emotion ? { ...e, level: level } : e))
    );
  };

  const handleEmotionLog = () => {
    onEmotionLog(selectedDate, selectedEmotions);
    setSelectedEmotions([]);
  };

  return (
    <div>
      <h2>Log Emotion for {selectedDate.toDateString()}:</h2>
      <button
        className={
          selectedEmotions.find((e) => e.name === "happy") ? "selected" : ""
        }
        onClick={() => handleEmotionToggle("happy")}
      >
        Happy
      </button>
      <button
        className={
          selectedEmotions.find((e) => e.name === "sad") ? "selected" : ""
        }
        onClick={() => handleEmotionToggle("sad")}
      >
        Sad
      </button>
      <button
        className={
          selectedEmotions.find((e) => e.name === "angry") ? "selected" : ""
        }
        onClick={() => handleEmotionToggle("angry")}
      >
        Angry
      </button>
      <button onClick={handleEmotionLog}>Log Emotion</button>
      {selectedEmotions.map((emotion) => (
        <div key={emotion.name}>
          <h3>{emotion.name}</h3>
          <input
            type="range"
            min={1}
            max={10}
            value={emotion.level}
            onChange={(e) =>
              handleEmotionLevelChange(emotion.name, parseInt(e.target.value))
            }
          />
          <span>{emotion.level}</span>
        </div>
      ))}
    </div>
  );
}

function EmotionLog({ log }) {
  return (
    <div>
      <h2>Emotion Log for {log.date.toDateString()}:</h2>
      {log.emotions.map((emotion, index) => (
        <p key={index}>
          {emotion.name} - Level: {emotion.level}
        </p>
      ))}
    </div>
  );
}

function Emotion() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [emotionLogs, setEmotionLogs] = useState([]);

  const [isOpenEmotion, setIsOpenEmotion] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEmotionLog = (date, emotions) => {
    const existingLogIndex = emotionLogs.findIndex(
      (log) => log.date.toDateString() === date.toDateString()
    );

    if (existingLogIndex !== -1) {
      const updatedLogs = [...emotionLogs];
      updatedLogs[existingLogIndex].emotions.push(...emotions);
      setEmotionLogs(updatedLogs);
    } else {
      setEmotionLogs([...emotionLogs, { date, emotions }]);
    }
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toDateString();
    const hasEmotionLog = emotionLogs.some(
      (log) => log.date.toDateString() === formattedDate
    );
    return hasEmotionLog ? <div className="emotion-log-asterisk">*</div> : null;
  };

  const getEmotionLogsByDate = (date) => {
    const logs = emotionLogs.filter(
      (log) => log.date.toDateString() === date.toDateString()
    );
    return logs.length > 0 ? logs : [];
  };

  return (
    <div className="App">
      <h1>Emotion Tracker</h1>
      <div>
        <ReactCalendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>
      <div>
        <button>food tracker</button>
        <button>craving tracker</button>
        <button>period tracker</button>
        <button>bowel tracker</button>
        <button onClick={() => setIsOpenEmotion(true)}>emotion tracker</button>
      </div>
      <div>
        {isOpenEmotion && (
          <EmotionLogger
            selectedDate={selectedDate}
            onEmotionLog={handleEmotionLog}
          />
        )}
      </div>
      <div>
        {getEmotionLogsByDate(selectedDate).map((log, index) => (
          <EmotionLog key={index} log={log} />
        ))}
      </div>
    </div>
  );
}

// export default function Emotion() {
//   const [budget, setBudget] = useState(null);
//   const [expenses, setExpenses] = useState([]);
//   const [expensesGenerated, setExpensesGenerated] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isDateOpen, setIsDateOpen] = useState(false);

//   const [stomachPain, setStomachPain] = useState({
//     isHurt: false,
//     date: Date.now(),
//     value: 1,
//   });
//   const [value, setValue] = useState();
//   const handleStomachPain = () => {
//     setStomachPain({ isHurt: true, date: Date.now(), value: 1 });
//   };

//   const handleBudgetSubmit = (budget) => {
//     setBudget(parseFloat(budget));
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
//         id: Date.now(),
//         // id: expenses.length + 1,
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
//     if (updatedBudget <= 0 && expensesGenerated === 0) {
//       alert("You have reached your budget limit!");
//     }
//   };

//   const deleteExpense = (id, amount) => {
//     const updatedExpenses = expenses.filter((item) => item.id !== id);
//     setExpenses(updatedExpenses);
//     updateBudget(amount);
//   };

//   const generateMonthlyExpenses = () => {
//     const monthlyAmount = budget / 12;
//     const generatedExpenses = Array.from({ length: 12 }, (_, index) => ({
//       id: index + 1,
//       description: `Monthly Expense ${index + 1}`,
//       amount: monthlyAmount,
//       date: new Date().toString(),
//       receipt: "",
//       receiptPreview: "",
//     }));
//     setExpensesGenerated(12);
//     setExpenses(generatedExpenses);
//     setBudget(0);
//   };

//   const getExpenseAmountById = (id) => {
//     const expense = expenses.find((item) => item.id === id);
//     return expense ? expense.amount : 0;
//   };

//   const handleDateChange = (date) => {
//     console.log("hello there", date);
//     setIsDateOpen(true);
//     setSelectedDate(date);
//   };

//   const tileContent = ({ date }) => {
//     const formattedDate = date.toDateString();
//     const hasExpense = expenses.some(
//       (expense) => new Date(expense.date).toDateString() === formattedDate
//     );
//     return hasExpense ? <div className="expense-dot">•</div> : null;
//   };

//   const filteredExpenses = expenses.filter(
//     (expense) =>
//       new Date(expense.date).toDateString() === selectedDate.toDateString()
//   );

//   return (
//     <div className="App">
//       {/* <h1>Expense Tracker</h1> */}

//       <div>
//         <ExpenseForm onExpenseSubmit={handleExpenseSubmit} />
//         <div>
//           {isDateOpen ? (
//             <div>
//               <div>
//                 <div>Emotion</div>
//                 <div>
//                   <button>☹</button>
//                   <button>☺</button>
//                   <button>😒</button>
//                   <button>🤢</button>
//                   <button onClick={handleStomachPain}>stomach</button>
//                 </div>
//                 <div>
//                   {stomachPain.isHurt === true ? (
//                     <>
//                       ❤
//                       <input
//                         type="range"
//                         maxValue={20}
//                         minValue={0}
//                         defaultValue={stomachPain.value}
//                         value={stomachPain.value}
//                         onChange={(e) =>
//                           setStomachPain((prev) => ({
//                             ...prev,
//                             value: e.target.value,
//                           }))
//                         }
//                       />
//                     </>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             ""
//           )}
//           <div>
//             <ReactCalendar
//               onChange={handleDateChange}
//               value={selectedDate}
//               tileContent={tileContent}
//             />
//           </div>
//           <ul>
//             {filteredExpenses.map((expense) => (
//               <li key={expense.id}>{expense.description}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Emotion;
