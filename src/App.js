import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Demo from "./pages/Demo";

function HomePage() {
  return <div className="page">🏠 Page</div>;
}

function NotFoundPage() {
  return <div className="page">🧐 Page</div>;
}

function ApplePage() {
  return <div className="page">🍎 Page</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div>
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
