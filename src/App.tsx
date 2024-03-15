import React from "react";

import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Budget } from "./component/Budget";
import { Home } from "./component/Home";

function App() {
  return (
    <article>
      <BrowserRouter>
        <nav>
          <Link className="nav-bar" to="/">
            home
          </Link>

          <Link className="nav-bar" to="/budget-app">
            Budget
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget-app" element={<Budget />} />
        </Routes>
      </BrowserRouter>
    </article>
  );
}
export default App;
