import './App.css';
import SearchBar from './components/SearchBar';
import InfoContainer from './components/InfoContainer';
import MapContainer from './components/MapContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar placeholder={'Search'}/>
        <h1>Welcome to Campaign Atlas</h1>
        <div className='viewPicker'>

        </div>
      </header>
      <div className="App-body">
        <InfoContainer />
        <MapContainer />
        {/* <TimelineContainer />
        <ConspiracyContainer /> */}
      </div>
    </div>
  );
}

export default App;
