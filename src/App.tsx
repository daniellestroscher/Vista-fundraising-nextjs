// import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Discover from "./components/pages/Discover";
import Create from "./components/pages/Create";
import MyProjects from "./components/pages/MyProjects";
import ISupport from "./components/pages/ISupport";
import ProjectInfo from "./components/pages/ProjectInfo";

function App() {
  return (
    <>
      <head>
        <title>Vista Fundraising</title>
        <meta
          name="description"
          content="support projects that make a difference"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="App">
        <header className="App-header">
          <div className="title">
            <h2 className="name">Vista Fundraising,</h2>
            <h4>support projects that make a difference.</h4>
          </div>
          <nav className="nav">
            <a href="/">
              <h3>Find places to give.</h3>
            </a>
            <a href="/create">
              <h3>Create a new funding project.</h3>
            </a>
            <a href="/my-projects">
              <h3>My funding projects.</h3>
            </a>
            <a href="/i-support">
              <h3>Funding project's i support.</h3>
            </a>
          </nav>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/create" element={<Create />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/i-support" element={<ISupport />} />
            <Route path="/projects/:id" element={<ProjectInfo />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
