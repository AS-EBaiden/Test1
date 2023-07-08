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

function DigestiveForm({ onExpenseSubmit, expense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount.toFixed(2));
      setDate(new Date(expense.date));
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello world");
    // if (!description || !amount) return;
    // const newExpense = {
    //   description,
    //   amount: parseFloat(amount),
    //   date,
    // };
    // onExpenseSubmit(newExpense, expense ? expense.id : null);
    // setDescription("");
    // setAmount("");
    // setDate(new Date());
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
      <button type="submit">Add Expense</button>
    </form>
  );
}
function DigestiveLogger({ selectedDate, onDigestiveLog }) {
  const [selectedDigestives, setSelectedDigestives] = useState([]);

  const handleDigestiveToggle = (digest) => {
    if (selectedDigestives.find((e) => e.name === digest)) {
      setSelectedDigestives(
        selectedDigestives.filter((e) => e.name !== digest)
      );
    } else {
      setSelectedDigestives([
        ...selectedDigestives,
        { name: digest, level: 0 },
      ]);
    }
  };

  const handleDigestiveLevelChange = (digest, level) => {
    setSelectedDigestives((prevdigests) =>
      prevdigests.map((e) => (e.name === digest ? { ...e, level: level } : e))
    );
  };

  const handleDigestLog = () => {
    onDigestiveLog(selectedDate, selectedDigestives);
    setSelectedDigestives([]);
  };

  return (
    <div>
      <h2>Log Digestive for {selectedDate.toDateString()}:</h2>
      <button
        className={
          selectedDigestives.find((e) => e.name === "stomach") ? "selected" : ""
        }
        onClick={() => handleDigestiveToggle("stomach")}
      >
        Stomach
      </button>
      <button
        className={
          selectedDigestives.find((e) => e.name === "bowel") ? "selected" : ""
        }
        onClick={() => handleDigestiveToggle("bowel")}
      >
        Bowel
      </button>
      {/* <button
        className={
          selectedDigestives.find((e) => e.name === "angry") ? "selected" : ""
        }
        onClick={() => handleDigestiveToggle("angry")}
      >
        Angry
      </button> */}
      <button className="submit" onClick={handleDigestLog}>
        Log digest
      </button>
      {selectedDigestives.map((digest) => (
        <div key={digest.name}>
          <h3>{digest.name}</h3>
          <input
            type="range"
            min={1}
            max={10}
            value={digest.level}
            onChange={(e) =>
              handleDigestiveLevelChange(digest.name, parseInt(e.target.value))
            }
          />
          <span>{digest.level}</span>
        </div>
      ))}
    </div>
  );
}

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
      <button className="submit" onClick={handleEmotionLog}>
        Log Emotion
      </button>
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
      <h2>Log for {log.date.toDateString()}:</h2>
      {log.emotions.map((emotion, index) => (
        <p key={index}>
          {emotion.name} - Level: {emotion.level}
        </p>
      ))}
    </div>
  );
}

function Trackers() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [emotionLogs, setEmotionLogs] = useState([]);
  const [isOpenEmotion, setIsOpenEmotion] = useState(false);
  const [isOpenDigestive, setIsOpenDigestive] = useState(false);

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

  const handleDigestiveLog = (date, emotions) => {
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

  const trackerFeatures = () => {
    if (isOpenEmotion)
      return (
        <EmotionLogger
          selectedDate={selectedDate}
          onEmotionLog={handleEmotionLog}
        />
      );
    else if (isOpenDigestive)
      return (
        <DigestiveLogger
          selectedDate={selectedDate}
          onDigestiveLog={handleDigestiveLog}
        />
      );
    else return;
  };

  return (
    <div className="App">
      <h1>Emotion Tracker</h1>
      <div style={{ display: "inline-flex" }}>
        <div className="left-calendar" style={{ padding: "2rem" }}>
          <ReactCalendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
          />
        </div>
        <div className="right-side" style={{ padding: "2rem" }}>
          <div id="category">
            <button className="category" style={{ background: "tomato" }}>
              food tracker
            </button>
            <button className="category" style={{ background: "gold" }}>
              craving tracker
            </button>
            <button className="category" style={{ background: "limegreen" }}>
              period tracker
            </button>
            <button
              onClick={() => setIsOpenDigestive(true)}
              className="category"
              style={{ background: "dodgerblue" }}
            >
              Digestive tracker
            </button>
            <button
              className="category"
              style={{ background: "violet" }}
              onClick={() => setIsOpenEmotion(true)}
            >
              emotion tracker
            </button>
          </div>
          <div>{trackerFeatures()}</div>
        </div>
      </div>

      <div>
        {getEmotionLogsByDate(selectedDate).map((log, index) => (
          <EmotionLog key={index} log={log} />
        ))}
      </div>
    </div>
  );
}

function Trackers1() {
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpenEmotion, setIsOpenEmotion] = useState(false);
  const [isOpenDigestive, setIsOpenDigestive] = useState(false);

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
      <div>
        <p>Trackers</p>
        <ExpenseForm onExpenseSubmit={handleExpenseSubmit} />
        <div>
          <div style={{ display: "inline-flex" }}>
            <div style={{ padding: "2rem" }}>
              <ReactCalendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
              />
            </div>
            <div style={{ padding: "2rem" }}>
              <div>
                <button className="category" style={{ background: "tomato" }}>
                  food tracker
                </button>
                <button className="category" style={{ background: "gold" }}>
                  craving tracker
                </button>
                <button
                  className="category"
                  style={{ background: "limegreen" }}
                >
                  period tracker
                </button>
                <button
                  onClick={() => setIsOpenDigestive(true)}
                  className="category"
                  style={{ background: "dodgerblue" }}
                >
                  Digestive tracker
                </button>
                <button
                  className="category"
                  style={{ background: "violet" }}
                  onClick={() => setIsOpenEmotion(true)}
                >
                  emotion tracker
                </button>
              </div>
              <div>{isOpenDigestive && <DigestiveForm />}</div>
            </div>
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
