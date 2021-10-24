import './App.css';
import Voting from "./components/Voting";
import Display from './components/Display';
import logo from "./assets/images/matchflix-logo.png";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="matchflix logo" />
        <Display />
        <Voting />
      </header>
    </div>
  );
}

export default App;
