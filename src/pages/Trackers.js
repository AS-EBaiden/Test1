import React, { useState, useEffect, useId } from "react";
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

function NotesForm({ onExpenseSubmit, expense, selectedDate }) {
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
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
    // if (!description || !amount) return;
    const newExpense = {
      description,
      notes,
      date,
    };
    onExpenseSubmit(newExpense, expense ? expense.id : null);
    setDescription("");
    setAmount("");
    setNotes("");
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div>
        <textarea
          type="text"
          placeholder={`Enter notes for ${date}...`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit">
        {expense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

function PeriodForm({
  onExpenseSubmit,
  expense,
  selectedDate,
  numOfPeriodDays,
  setNumOfPeriodDays,
}) {
  const [description, setDescription] = useState("");
  const [enableNotes, setEnableNotes] = useState(false);
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState([]);

  const today = new Date();
  const daysLater = new Date();
  daysLater.setDate(today.getDate() + numOfPeriodDays);

  useEffect(() => {
    setDate(new Date(selectedDate));
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      description: description || "Period Started",
      isStarted: true,
      endDate: daysLater.toDateString(),
      // endDate:
      //   "insert logic that adds your average period days number from when the date of your period started this month ",
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

          <input
            type="number"
            step="1"
            placeholder="Enter number..."
            value={numOfPeriodDays}
            onChange={(e) => setNumOfPeriodDays(Number(e.target.value))}
          />
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

function EmotionLog({ log, activeTracker, numOfPeriodDays }) {
  return (
    <div>
      {log.costs?.length > 0 && <h2>Costs for {log.date?.toDateString()}:</h2>}
      {log.costs?.map((note, index) => (
        <div key={index}>
          <h2>{note.description}:</h2>

          <p key={index}>{note.costs}</p>
        </div>
      ))}
      {log.budgets?.length > 0 && (
        <h2>Budgets for {log.date?.toDateString()}:</h2>
      )}
      {log.budgets?.map((note, index) => (
        <div key={index}>
          <h2>{note.description}:</h2>

          <p key={index}>{note.budgets}</p>
        </div>
      ))}
      {log.notes?.length > 0 && <h2>Notes for {log.date?.toDateString()}:</h2>}
      {log.notes?.map((note, index) => (
        <div key={index}>
          <h2>{note.description}:</h2>

          <p key={index}>{note.notes}</p>
        </div>
      ))}
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
        <div key={index}>
          <p>
            {" "}
            {pd.isStarted} {pd.description} - Pain Level: {pd.amount}
          </p>
          <p>Period Duration: {numOfPeriodDays} Days</p>
        </div>
      ))}
    </div>
  );
}
function BudgetForm({
  onExpenseSubmit,
  expense,
  selectedDate,
  setEmotionLogs,
  emotionLogs,
}) {
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const handleBoardTitleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleAddBoard = () => {
    const newExpense = {
      description: newBoardTitle,
      lists: [],
      date,
    };
    if (newBoardTitle.trim() !== "") {
      setBoards([...boards, { title: newBoardTitle, lists: [] }]);
      onExpenseSubmit(newExpense);
      setNewBoardTitle("");
    }
  };

  const handleAddList = (boardIndex) => {
    const updatedBoards = [...boards];
    const updatedExp = [...emotionLogs];
    updatedBoards[boardIndex].lists.push({ title: newListTitle });
    console.log(
      "updated expe",
      updatedExp,
      updatedExp[0]["budgets"][boardIndex].lists.push({ title: newListTitle })
    );
    setEmotionLogs(updatedExp);
    setBoards(updatedBoards);
    setNewListTitle("");
  };

  console.log("boards", boards);

  return (
    <div>
      <h2>Trello Board</h2>

      <div>
        <input
          type="text"
          placeholder="Enter board title"
          value={newBoardTitle}
          onChange={handleBoardTitleChange}
        />
        <button onClick={handleAddBoard}>Add Board</button>
      </div>

      {boards.map((board, boardIndex) => (
        <div key={boardIndex}>
          <h3>{board.title}</h3>
          <div>
            <input
              type="text"
              placeholder="Enter list title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
            <button onClick={() => handleAddList(boardIndex)}>Add List</button>
          </div>

          {board.lists.map((list, listIndex) => (
            <div key={listIndex}>
              <h4>{list.title}</h4>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function BudgetExpense({
  onExpenseSubmit,
  expense,
  selectedDate,
  setEmotionLogs,
  emotionLogs,
}) {
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [budgetAmount, setBudgetAmout] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const handleBoardTitleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };
  useEffect(() => {
    setDate(new Date(selectedDate));
  }, [selectedDate]);

  const handleAddBoard = () => {
    const newExpense = {
      description: newBoardTitle,
      lists: [],
      amount: budgetAmount,
      remaining: 0,
      date: new Date(),
    };
    if (newBoardTitle.trim() !== "") {
      setBoards([...boards, { title: newBoardTitle, lists: [] }]);
      onExpenseSubmit(newExpense);
      setNewBoardTitle("");
      setBudgetAmout("");
    }
  };

  const handleAddList = (boardIndex) => {
    const updatedBoards = [...boards];
    const updatedExp = [...emotionLogs];
    // updatedBoards[boardIndex].lists.push({ title: newListTitle });
    console.log(
      "updated expe",
      updatedExp,
      updatedExp[0]["costs"][boardIndex].lists.push({
        date,
        title: newListTitle,
        amount: expenseAmount,
      })
    );
    setEmotionLogs(updatedExp);
    setBoards(updatedBoards);
    setNewListTitle("");
    setExpenseAmount("");
  };

  const changeHandler = (date) => {
    setDate(date);
  };

  return (
    <div>
      <h2>Trello Board</h2>

      <div>
        <input
          type="text"
          placeholder="Enter board title"
          value={newBoardTitle}
          onChange={handleBoardTitleChange}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Enter your budget..."
          value={budgetAmount}
          onChange={(e) => setBudgetAmout(parseFloat(e.target.value))}
        />
        <button onClick={handleAddBoard}>Add Board</button>
      </div>

      {emotionLogs[0]?.costs.map((board, boardIndex) => {
        let result = board.lists.reduce((r, d) => r + d.amount, 0);
        return (
          <div key={boardIndex}>
            <h3>
              {board.description} Budget: {board.amount}{" "}
            </h3>
            {board.lists.length > 0 && (
              <h4>Remaining:{(board.amount - result).toFixed(2)}</h4>
            )}
            <div>
              <input
                type="text"
                placeholder="Enter list title"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Enter your budget..."
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
              />
              <div>
                <label>Date:</label>
                <DatePicker selected={date} onChange={changeHandler} />
              </div>
              <button onClick={() => handleAddList(boardIndex)}>
                Add List
              </button>
            </div>

            {board.lists.map((list, listIndex) => {
              return (
                <div key={listIndex}>
                  <h4>{list.title}</h4>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Trackers() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [emotionLogs, setEmotionLogs] = useState([]);
  const [activeTracker, setActiveTracker] = useState(null);
  const [trackedPeriodDates, setTrackedPeriodDates] = useState([]);
  const [numOfPeriodDays, setNumOfPeriodDays] = useState(0);

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

  const handleExpenseSubmit = (expense, id, nestedData) => {
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

  const tileContent = ({ date }) => {
    const formattedDate = date.toDateString();
    const hasEmotionLog = emotionLogs.some(
      (log) =>
        log.date.toDateString() === formattedDate && log.emotions?.length > 0
    );

    const hasCravingsLog = emotionLogs.some(
      (log) =>
        log.date.toDateString() === formattedDate && log.cravings?.length > 0
    );

    const hasExpense = emotionLogs[0]?.costs.some((log) =>
      log.lists.some(
        (i) => i.date.toDateString() === formattedDate && log.lists?.length > 0
      )
    );

    const hasFullNotes = emotionLogs.some(
      (log) =>
        log.date.toDateString() === formattedDate && log.notes?.length > 0
    );

    const isBetweenPeriod = trackedPeriodDates.some(
      (trackedDate) =>
        new Date(trackedDate) <= date &&
        new Date(trackedDate).setDate(
          new Date(trackedDate).getDate() + numOfPeriodDays
        ) >= date
    );

    return (
      <div style={{ display: "flex", placeContent: "center" }}>
        {hasEmotionLog && <div className="emotion-log-asterisk">🥰</div>}
        {/* {hasPeriodLog && <div className="period-log-asterisk">🍊</div>}*/}
        {hasCravingsLog && <div className="period-log-asterisk">🍋</div>}
        {hasFullNotes && <div className="period-log-asterisk">🧾</div>}
        {isBetweenPeriod && <div className="period-log-asterisk">🩸</div>}
        {hasExpense && <div className="period-log-asterisk">💲</div>}
      </div>
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
      case "budgets":
        return (
          <BudgetForm
            emotionLogs={emotionLogs}
            setEmotionLogs={setEmotionLogs}
            onExpenseSubmit={handleExpenseSubmit}
            selectedDate={selectedDate}
            onCravingLog={handleCravingLog}
          />
        );
      case "costs":
        return (
          <BudgetExpense
            emotionLogs={emotionLogs}
            setEmotionLogs={setEmotionLogs}
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
            numOfPeriodDays={numOfPeriodDays}
            setNumOfPeriodDays={setNumOfPeriodDays}
          />
        );
      case "notes":
        return (
          <NotesForm
            onExpenseSubmit={handleExpenseSubmit}
            selectedDate={selectedDate}
            onCravingLog={handleCravingLog}
          />
        );
      case "digestive":
        return (
          <DigestiveLogger
            selectedDate={selectedDate}
            onExpenseSubmit={handleExpenseSubmit}
            onDigestiveLog={handleDigestiveLog}
          />
        );
      default:
        return null;
    }
  };

  console.log("emotion logs", emotionLogs);

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
              style={{ background: "gold" }}
              onClick={() => setActiveTracker("emotion")}
            >
              emotion tracker
            </button>
            <button
              className={`category ${
                activeTracker === "cravings" ? "active" : ""
              }`}
              style={{ background: "limegreen" }}
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
            <button
              className={`category ${
                activeTracker === "notes" ? "active" : ""
              }`}
              style={{ background: "blueviolet" }}
              onClick={() => setActiveTracker("notes")}
            >
              Notes
            </button>
            <button
              className={`category ${
                activeTracker === "budgets" ? "active" : ""
              }`}
              style={{ background: "mediumorchid" }}
              onClick={() => setActiveTracker("budgets")}
            >
              Budget
            </button>
            <button
              className={`category ${
                activeTracker === "costs" ? "active" : ""
              }`}
              style={{ background: "violet" }}
              onClick={() => setActiveTracker("costs")}
            >
              Costs
            </button>
          </div>
          <div>{trackerFeatures()}</div>
        </div>
      </div>
      <div>
        {getEmotionLogsByDate(selectedDate).map((log, index) => (
          <EmotionLog
            key={index}
            log={log}
            activeTracker={activeTracker}
            numOfPeriodDays={numOfPeriodDays}
          />
        ))}
      </div>
      {/* ... */}
    </div>
  );
}

export default Trackers;
