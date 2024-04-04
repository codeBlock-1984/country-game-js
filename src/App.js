import './App.css';
import { Game } from './Game';

const DATA = {
  USA: 'Washington DC',
  Nigeria: 'Abuja',
  Czechia: 'Prague',
  France: 'Paris',
  Slovakia: 'Bratislava',
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h6>Country Game</h6>
      </header>
      <Game data={DATA} />
    </div>
  );
}

export default App;
