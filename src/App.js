import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" component={HomePage} />
      </Routes>
    </div>
  );
}

export default App;
