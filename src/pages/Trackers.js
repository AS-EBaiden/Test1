import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CravingForm({ onExpenseSubmit, expense, selectedDate }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date(selectedDate));
    // if (expense) {
    //   setDescription(expense.description);
    //   setAmount(expense.amount.toFixed(2));
    //   setDate(new Date(expense.date));
    // }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    const newExpense = {
      description,
      amount: parseFloat(amount),
      date,
    };
    onExpenseSubmit(newExpense, expense ? expense.id : null);
    setDescription("");
    setAmount("");
    setDate(new Date());
  };

  const changeHandler = (date) => {
    setDate(date);
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
        <DatePicker selected={date} onChange={changeHandler} />
      </div>

      <button type="submit">
        {expense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

function PeriodForm({ onExpenseSubmit, expense, selectedDate }) {
  const [description, setDescription] = useState("");
  const [enableNotes, setEnableNotes] = useState(false);
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState([]);

  useEffect(() => {
    setDate(new Date(selectedDate));
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      description: description || "Period Started",
      isStarted: true,
      endDate:
        "insert logic that adds your average period days number from when the date of your period started this month ",
      amount: parseFloat(amount),
      date,
    };
    onExpenseSubmit(newExpense, expense ? expense.id : null);
    setDescription("");
    setAmount("");
    setDate(new Date());
    setEnableNotes(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {enableNotes ? (
        <>
          <textarea
            type="text"
            placeholder="Enter any additional details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="range"
            min={1}
            max={10}
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <span>{amount}</span>
        </>
      ) : (
        <>
          <span>Pain Level: {amount}</span>
          <span></span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEnableNotes(true);
            }}
          >
            Add Notes
          </button>
        </>
      )}

      <div>
        <button type="submit">
          {expense ? "Update Expense" : "Track Now"}
        </button>
      </div>
    </form>
  );
}
function DigestiveLogger({ selectedDate, onDigestiveLog }) {
  const [selectedDigestives, setSelectedDigestives] = useState([]);

  const handleDigestiveToggle = (digest) => {
    if (selectedDigestives.some((e) => e.name === digest)) {
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
    if (selectedEmotions.some((e) => e.name === emotion)) {
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

function EmotionLog({ log, activeTracker }) {
  return (
    <div>
      {log.emotions?.length > 0 && (
        <h2>Emotion Log for {log.date?.toDateString()}:</h2>
      )}
      {log.emotions?.map((emotion, index) => (
        <p key={index}>
          {emotion.name} - Level: {emotion.level}
        </p>
      ))}
      {log.cravings?.length > 0 && (
        <h2>CravingsLog for {log.date?.toDateString()}:</h2>
      )}
      {log.cravings?.map((craving, index) => (
        <p key={index}>
          {craving.description} - Level: {craving.amount}
        </p>
      ))}

      {log.period?.length > 0 && (
        <h2>Period Log for {log.date?.toDateString()}:</h2>
      )}
      {log.period?.map((pd, index) => (
        <p key={index}>
          {pd.isStarted} {pd.description} - Pain Level: {pd.amount}
        </p>
      ))}
    </div>
  );
}

function Trackers() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [emotionLogs, setEmotionLogs] = useState([]);
  const [activeTracker, setActiveTracker] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [trackedPeriodDates, setTrackedPeriodDates] = useState([]);
  const [trackedEmotionDates, setEmotionPeriodDates] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDigestiveLog = (date, emotions) => {
    const existingLogIndex = emotionLogs.findIndex(
      (log) => log.date.toDateString() === date.toDateString()
    );

    if (existingLogIndex !== -1) {
      const updatedLogs = [...emotionLogs];
      if (!updatedLogs[existingLogIndex].emotions) {
        updatedLogs[existingLogIndex].emotions = [...emotions];
      } else {
        updatedLogs[existingLogIndex].emotions.push(...emotions);
      }
      setEmotionLogs(updatedLogs);
    } else {
      setEmotionLogs([...emotionLogs, { date, emotions }]);
    }
  };

  const handleEmotionLog = (date, emotions) => {
    const existingLogIndex = emotionLogs.findIndex(
      (log) => log.date.toDateString() === date.toDateString()
    );

    if (existingLogIndex !== -1) {
      const updatedLogs = [...emotionLogs];
      if (!updatedLogs[existingLogIndex].emotions) {
        updatedLogs[existingLogIndex].emotions = [...emotions];
      } else {
        updatedLogs[existingLogIndex].emotions.push(...emotions);
      }
      setEmotionLogs(updatedLogs);
    } else {
      setEmotionLogs([...emotionLogs, { date, emotions }]);
    }
  };
  const handleCravingLog = (date, cravings) => {
    const existingLogIndex = emotionLogs.findIndex(
      (log) => log.date.toDateString() === date.toDateString()
    );

    if (existingLogIndex !== -1) {
      const updatedLogs = [...emotionLogs];
      if (!updatedLogs[existingLogIndex].cravings) {
        updatedLogs[existingLogIndex].cravings = cravings;
      } else {
        updatedLogs[existingLogIndex].cravings.push(...cravings);
      }
      setEmotionLogs(updatedLogs);
    } else {
      setEmotionLogs([...emotionLogs, { date, cravings }]);
    }
  };

  // const handleExpenseSubmit = (expense, id) => {
  //   if (id) {
  //     const updatedExpenses = expenses.map((item) =>
  //       item.id === id ? { ...item, ...expense } : item
  //     );
  //     setExpenses(updatedExpenses);
  //   } else {
  //     const existingLogIndex = emotionLogs.findIndex(
  //       (log) => log.date.toDateString() === expense.date.toDateString()
  //     );
  //     let vad = activeTracker;
  //     console.log("active", activeTracker);
  //     console.log("vad", vad);
  //     if (existingLogIndex !== -1) {
  //       const updatedLogs = [...emotionLogs];
  //       if (!updatedLogs[existingLogIndex][activeTracker]) {
  //         updatedLogs[existingLogIndex][activeTracker] = [expense];
  //       } else {
  //         updatedLogs[existingLogIndex][activeTracker].push(expense);
  //       }
  //       setEmotionLogs(updatedLogs);
  //     } else {
  //       setEmotionLogs([
  //         ...emotionLogs,
  //         {
  //           date: expense.date,
  //           [activeTracker]: [expense],
  //         },
  //       ]);
  //     }
  //     if (activeTracker === "period") {
  //       setTrackedPeriodDates((prevDates) => [
  //         ...prevDates,
  //         expense.date.toDateString(),
  //       ]);
  //     }

  //     const newExpense = {
  //       ...expense,
  //       id: Date.now(),
  //       date: expense.date.toString(),
  //     };
  //     const updatedExpenses = [...expenses, newExpense];
  //     setExpenses(updatedExpenses);
  //   }
  // };

  const handleExpenseSubmit = (expense, id) => {
    if (id) {
      // ...
    } else {
      const formattedDate = expense.date.toDateString();

      if (activeTracker === "period") {
        setTrackedPeriodDates((prevDates) => [...prevDates, formattedDate]);
      }

      const existingLogIndex = emotionLogs.findIndex(
        (log) => log.date.toDateString() === formattedDate
      );

      if (existingLogIndex !== -1) {
        const updatedLogs = [...emotionLogs];
        if (!updatedLogs[existingLogIndex][activeTracker]) {
          updatedLogs[existingLogIndex][activeTracker] = [expense];
        } else {
          updatedLogs[existingLogIndex][activeTracker].push(expense);
        }
        setEmotionLogs(updatedLogs);
      } else {
        setEmotionLogs([
          ...emotionLogs,
          {
            date: expense.date,
            [activeTracker]: [expense],
          },
        ]);
      }
    }
  };

  // const tileContent = ({ date }) => {
  //   const formattedDate = date.toDateString();
  //   const hasEmotionLog = emotionLogs.some(
  //     (log) => log.date.toDateString() === formattedDate
  //   );

  //   const hasTrackedPeriod = trackedPeriodDates.includes(formattedDate);

  //   return (
  //     <>
  //       {hasEmotionLog && !hasTrackedPeriod ? (
  //         <div className="emotion-log-asterisk">*</div>
  //       ) : null}
  //       {hasTrackedPeriod ? (
  //         <div
  //           style={{ color: "red", fontWeight: 900 }}
  //           className="period-log-asterisk"
  //         >
  //           *
  //         </div>
  //       ) : null}
  //     </>
  //   );
  // };
  // const tileContent = ({ date }) => {
  //   const formattedDate = date.toDateString();
  //   const hasEmotionLog = emotionLogs.some(
  //     (log) => log.date.toDateString() === formattedDate
  //   );
  //   const hasTrackedPeriod = trackedPeriodDates.includes(formattedDate);

  //   return (
  //     <>
  //       {hasEmotionLog && !hasTrackedPeriod ? (
  //         <div className="emotion-log-asterisk">*</div>
  //       ) : null}
  //       {hasTrackedPeriod && hasEmotionLog ? (
  //         <div
  //           style={{ color: "red", fontWeight: 900 }}
  //           className="period-log-asterisk"
  //         >
  //           *
  //         </div>
  //       ) : null}
  //     </>
  //   );
  // };
  // const tileContent = ({ date }) => {
  //   const formattedDate = date.toDateString();
  //   const hasEmotionLog = emotionLogs.some(
  //     (log) => log.date.toDateString() === formattedDate
  //   );
  //   const hasTrackedPeriod = trackedPeriodDates.includes(formattedDate);
  //   const hasEmotionPeriod = trackedEmotionDates.includes(formattedDate);
  //   console.log("hello", hasTrackedPeriod);
  //   return (
  //     <>
  //       {hasEmotionPeriod ? (
  //         <div
  //           className="emotion-log-asterisk"
  //           style={{ color: "dodgerblue", fontWeight: 900 }}
  //         >
  //           *
  //         </div>
  //       ) : null}
  //       {hasEmotionPeriod && !hasTrackedPeriod ? (
  //         <div
  //           style={{ color: "green", fontWeight: 900 }}
  //           className="emotion-log-asterisk"
  //         >
  //           *
  //         </div>
  //       ) : null}
  //       {hasTrackedPeriod ? (
  //         <div
  //           style={{ color: "red", fontWeight: 900 }}
  //           className="period-log-asterisk"
  //         >
  //           *
  //         </div>
  //       ) : null}

  //       {/* <>{hasEmotionLog ? <div>💖</div> : ""}</> */}
  //     </>
  //   );
  // };
  // const tileContent = ({ date }) => {
  //   const formattedDate = date.toDateString();
  //   const hasEmotionLog = emotionLogs.some(
  //     (log) => log.date.toDateString() === formattedDate
  //   );
  //   const hasPeriodLog = trackedPeriodDates.includes(formattedDate);

  //   return (
  //     <>
  //       {hasEmotionLog ? (
  //         <div className="emotion-log-asterisk" style={{ color: "red" }}>
  //           *
  //         </div>
  //       ) : null}
  //       {hasPeriodLog ? (
  //         <div
  //           className="period-log-asterisk"
  //           style={{ color: "green", fontWeight: 900 }}
  //         >
  //           *
  //         </div>
  //       ) : null}
  //     </>
  //   );
  // };

  const tileContent = ({ date }) => {
    const formattedDate = date.toDateString();
    const hasEmotionLog = emotionLogs.some(
      (log) =>
        log.date.toDateString() === formattedDate && log.emotions?.length > 0
    );
    const hasPeriodLog = emotionLogs.some(
      (log) =>
        log.date.toDateString() === formattedDate && log.period?.length > 0
    );

    return (
      <>
        {hasEmotionLog ? (
          <div
            className="emotion-log-asterisk"
            style={{ color: "dodgerblue", fontWeight: 900 }}
          >
            *
          </div>
        ) : null}
        {hasPeriodLog ? (
          <div
            className="period-log-asterisk"
            style={{ color: "red", fontWeight: 900 }}
          >
            *
          </div>
        ) : null}
      </>
    );
  };

  const getEmotionLogsByDate = (date) => {
    const logs = emotionLogs.filter(
      (log) => log.date.toDateString() === date.toDateString()
    );
    return logs.length > 0 ? logs : [];
  };

  const trackerFeatures = () => {
    switch (activeTracker) {
      case "emotion":
        return (
          <EmotionLogger
            selectedDate={selectedDate}
            onEmotionLog={handleEmotionLog}
          />
        );
      case "cravings":
        return (
          <CravingForm
            onExpenseSubmit={handleExpenseSubmit}
            selectedDate={selectedDate}
            onCravingLog={handleCravingLog}
          />
        );
      case "period":
        return (
          <PeriodForm
            onExpenseSubmit={handleExpenseSubmit}
            selectedDate={selectedDate}
            onCravingLog={handleCravingLog}
          />
        );
      case "digestive":
        return (
          <DigestiveLogger
            selectedDate={selectedDate}
            onDigestiveLog={handleDigestiveLog}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>
        <span style={{ filter: "blur(5px)", WebkitFilter: "blur(5px)" }}>
          Emotion
        </span>{" "}
        Tracker
      </h1>
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
            <button
              className={`category ${
                activeTracker === "period" ? "active" : ""
              }`}
              style={{ background: "tomato" }}
              onClick={() => setActiveTracker("period")}
            >
              Period tracker
            </button>
            <button
              className={`category ${
                activeTracker === "emotion" ? "active" : ""
              }`}
              style={{ background: "violet" }}
              onClick={() => setActiveTracker("emotion")}
            >
              emotion tracker
            </button>
            <button
              className={`category ${
                activeTracker === "cravings" ? "active" : ""
              }`}
              style={{ background: "gold" }}
              onClick={() => setActiveTracker("cravings")}
            >
              craving tracker
            </button>
            <button
              className={`category ${
                activeTracker === "digestive" ? "active" : ""
              }`}
              style={{ background: "dodgerblue" }}
              onClick={() => setActiveTracker("digestive")}
            >
              Digestive tracker
            </button>
          </div>
          <div>{trackerFeatures()}</div>
        </div>
      </div>
      <div>
        {getEmotionLogsByDate(selectedDate).map((log, index) => (
          <EmotionLog key={index} log={log} activeTracker={activeTracker} />
        ))}
      </div>
      {/* ... */}
    </div>
  );
}

export default Trackers;
