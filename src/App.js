import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Demo from "./pages/Demo";
import Emotion from "./pages/Emotion";
import Trackers from "./pages/Trackers";
import "./App.css";

function HomePage() {
  return <div className="page">🏠 Page</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <span style={{ padding: "1em" }}>
          <Link to="/emotion" className="link">
            Emotion
          </Link>
        </span>
        <span style={{ padding: "1em" }}>
          <Link to="/" className="link">
            Home
          </Link>
        </span>
        <span style={{ padding: "1em" }}>
          <Link to="/demo" className="link">
            Demo Page
          </Link>
        </span>
        <span style={{ padding: "1em" }}>
          <Link to="/calendar" className="link">
            Calendar
          </Link>
        </span>
        <span style={{ padding: "1em" }}>
          <Link to="/trackers" className="link">
            Trackers
          </Link>
        </span>

        {/* <Link to="/applet" className="link">
          Applet
        </Link>
        <Link to="/test" className="link">
          Test
        </Link> */}
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/emotion" element={<Emotion />} />
        <Route path="/trackers" element={<Trackers />} />
        {/* <Route path="/404" element={<NotFoundPage />} />
        <Route path="/apple">
          <Route path="/" element={<ApplePage />} />
          <Route path="*" element={<Navigate replace to="/apple" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
