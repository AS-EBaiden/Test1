import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as ReactCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

function PeriodForm({
  onExpenseSubmit,
  expense,
  selectedDate,
  setActiveTracker,
}) {
  const [description, setDescription] = useState("");
  const [enableNotes, setEnableNotes] = useState(false);
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [numOfPeriodDays, setNumOfPeriodDays] = useState(1);
  const [isPeriodActive, setIsPeriodActive] = useState(false);

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
      painLevel: parseFloat(amount),
      periodDays: numOfPeriodDays,
      date,
    };
    setIsPeriodActive(true);
    onExpenseSubmit(newExpense, expense ? expense.id : null);
    setDescription("");
    setAmount(1);
    setNumOfPeriodDays(1);
    setDate(new Date());
    setEnableNotes(false);
  };
  console.log("is period active", isPeriodActive);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button
          className={`category ${isPeriodActive && "disabled"}`}
          disabled={isPeriodActive && true}
          type="submit"
          style={{ background: "tomato", position: "relative" }}
          onClick={() => setActiveTracker("period")}
        >
          {isPeriodActive && (
            <span
              style={{
                color: "green",
                position: "absolute",
                top: "7px",
                left: "6px",
              }}
            >
              ⚪
              <span
                style={{ color: "green", position: "relative", left: "-15px" }}
              >
                ✔
              </span>
            </span>
          )}
          {expense ? "Update Expense" : "Track Now"}
        </button>
      </div>
    </form>
  );
}

function DigestiveLogger({
  onExpenseSubmit,
  selectedDate,
  onDigestiveLog,
  setActiveTracker,
}) {
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
  let newExpense = {
    date: selectedDate,
    ...selectedDigestives[0],
  };

  const handleDigestLog = (e) => {
    e.preventDefault();
    // onDigestiveLog(selectedDate, selectedDigestives);
    onExpenseSubmit(newExpense);
    setSelectedDigestives([]);
  };

  return (
    <form onSubmit={handleDigestLog}>
      <button
        className={`category`}
        type="submit"
        style={{ background: "gold" }}
        // onClick={handleDigestLog}

        onClick={() => {
          setActiveTracker("digestive");
          handleDigestiveToggle("bowel");
        }}
      >
        Log digest
      </button>
    </form>
  );
}
function Trackers() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [emotionLogs, setEmotionLogs] = useState([]);
  const [activeTracker, setActiveTracker] = useState(null);
  const [trackedPeriodDates, setTrackedPeriodDates] = useState([]);
  const [numOfPeriodDays, setNumOfPeriodDays] = useState(1);
  const [boards, setBoards] = useState([]);
  const [textToAI, setTextToAI] = useState("");
  const [profile, setProfile] = useState(null);
  const [trackedPeriodFrame, setTrackedPeriodFrame] = useState([]);
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

  console.log("activerainbow", activeTracker);

  const handleThisToOfficialState = (expense, id, nestedData) => {
    console.log("active tracket", activeTracker);
    console.log("expensss", expense);
    if (id) {
      // ...
    } else {
      const formattedDate = expense.date.toDateString();
      const numpddays = expense.periodDays;
      const trackedData = { formattedDate, numpddays };

      if (activeTracker === "emotions") console.log("🌈");

      if (activeTracker === "period") {
        setTrackedPeriodDates((prevDates) => [...prevDates, formattedDate]);
        setTrackedPeriodFrame((prev) => [...prev, trackedData]);
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
        let keyWord = activeTracker === "period" ? expense : [expense];
        setEmotionLogs([
          ...emotionLogs,
          {
            date: expense.date,
            [activeTracker]: keyWord,
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

    const hasExpense = emotionLogs[0]?.costs?.some((log) =>
      log.lists.some(
        (i) => i.date.toDateString() === formattedDate && log.lists?.length > 0
      )
    );

    const hasFullNotes = emotionLogs.some(
      (log) =>
        log.date.toDateString() === formattedDate && log.notes?.length > 0
    );

    const hasDigestive = emotionLogs.some(
      (log) =>
        log.date.toDateString() === formattedDate && log.digestive?.length > 0
    );

    const inbetween = trackedPeriodFrame.some(
      (trackedDate) =>
        new Date(trackedDate.formattedDate) <= date &&
        new Date(trackedDate.formattedDate).setDate(
          new Date(trackedDate.formattedDate).getDate() +
            trackedDate.numpddays -
            1
        ) >= date
    );

    return (
      <div style={{ display: "flex", placeContent: "center" }}>
        {hasEmotionLog && <div className="emotion-log-asterisk">🥰</div>}
        {hasCravingsLog && <div className="period-log-asterisk">🍋</div>}
        {hasFullNotes && <div className="period-log-asterisk">🧾</div>}
        {inbetween && <div className="period-log-asterisk">🩸</div>}
        {hasDigestive && <div className="period-log-asterisk">💩</div>}
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
    // switch (activeTracker) {
    //   case "profile":
    //     return <Profile boards={boards} setBoards={setBoards} />;
    //   case "emotion":
    //     return (
    //       <EmotionLogger
    //         selectedDate={selectedDate}
    //         onEmotionLog={handleEmotionLog}
    //       />
    //     );
    //   case "cravings":
    //     return (
    //       <CravingForm
    //         onExpenseSubmit={handleThisToOfficialState}
    //         selectedDate={selectedDate}
    //         onCravingLog={handleCravingLog}
    //       />
    //     );
    //   case "budgets":
    //     return (
    //       <BudgetForm
    //         emotionLogs={emotionLogs}
    //         setEmotionLogs={setEmotionLogs}
    //         onExpenseSubmit={handleThisToOfficialState}
    //         selectedDate={selectedDate}
    //         onCravingLog={handleCravingLog}
    //       />
    //     );
    //   case "costs":
    //     return (
    //       <BudgetExpense
    //         emotionLogs={emotionLogs}
    //         setEmotionLogs={setEmotionLogs}
    //         onExpenseSubmit={handleThisToOfficialState}
    //         selectedDate={selectedDate}
    //         onCravingLog={handleCravingLog}
    //       />
    //     );
    //   case "period":
    //     return (
    //       <PeriodForm
    //         onExpenseSubmit={handleThisToOfficialState}
    //         selectedDate={selectedDate}
    //         onCravingLog={handleCravingLog}
    //         numOfPeriodDays={numOfPeriodDays}
    //         setNumOfPeriodDays={setNumOfPeriodDays}
    //       />
    //     );
    //   case "notes":
    //     return (
    //       <NotesForm
    //         onExpenseSubmit={handleThisToOfficialState}
    //         selectedDate={selectedDate}
    //         onCravingLog={handleCravingLog}
    //       />
    //     );
    //   case "digestive":
    //     return (
    //       <DigestiveLogger
    //         selectedDate={selectedDate}
    //         onExpenseSubmit={handleThisToOfficialState}
    //         onDigestiveLog={handleDigestiveLog}
    //       />
    //     );
    //   default:
    //     return null;
    // }
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
        <div className="right-side" style={{ padding: "2rem" }}>
          <div id="category" style={{ display: "inline-flex" }}>
            <PeriodForm
              setActiveTracker={setActiveTracker}
              onExpenseSubmit={handleThisToOfficialState}
              selectedDate={selectedDate}
              onCravingLog={handleCravingLog}
              numOfPeriodDays={numOfPeriodDays}
              setNumOfPeriodDays={setNumOfPeriodDays}
            />

            <DigestiveLogger
              setActiveTracker={setActiveTracker}
              selectedDate={selectedDate}
              onExpenseSubmit={handleThisToOfficialState}
              onDigestiveLog={handleDigestiveLog}
            />
          </div>
          <div>{trackerFeatures()}</div>
        </div>
      </div>
      <div>the right side</div>
    </div>
  );
}

function Dee({ char1, char2, car3 }) {
  return (
    <div>
      <div>jake</div>
      {() => <div>ioji</div>}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <div>
        <h3>trackers</h3>
        <Trackers />
        <Dee char1="blossom" char2="bubbles" car3="buttercup" />
      </div>
    </div>
  );
}
