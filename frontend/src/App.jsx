import "./App.css";
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";
// import { Face } from "./components/Face";
import { Form } from "./components/Form";
import { Tasks } from "./components/Tasks";
import { TaskDetails } from "./components/Task";
import { TaskCreation } from "./components/TaskCreation";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex flex-row justify-between">
        <Link to="/" className="navbar-brand">
          MoodSync
        </Link>
        <div className="flex flex-row gap-5">
          <Link to="/tasks" className="navbar-brand">
            Tasks
          </Link>
          <Link to="/sentiment-analysis" className="navbar-brand">
            Sentiment Analysis
          </Link>
        </div>
      </nav>
      <>
        <Routes>
          <Route path="/" element={<div>Home Dashboard</div>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/sentiment-analysis" element={<Form />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
          <Route path="/tasks/create" element={<TaskCreation />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
