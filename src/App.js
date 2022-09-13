import './App.css';
import MapContainer from './components/MapContainer';
import InfoContainer from './components/InfoContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Campaign Atlas</h1>
      </header>
      <div className="App-body">
        <InfoContainer />
        <MapContainer />
      </div>
    </div>
  );
}

export default App;
