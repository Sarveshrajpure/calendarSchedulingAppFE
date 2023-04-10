import { Routes, Route } from "react-router-dom";
// import "./App.css";
import EnrollPage from "./enroll/EnrollPage";
import CalendarPage from "./calendar/Calendar";

function App() {
  return (
    <div className="App  ">
      <Routes>
        <Route path="/" element={<EnrollPage />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
