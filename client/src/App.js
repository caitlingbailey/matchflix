import "./App.css";
import MatchFlix from "./containers/MatchFlix";
import Welcome from "./containers/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/matchflix" element={<MatchFlix />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
