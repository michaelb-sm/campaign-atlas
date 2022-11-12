import './App.css';
import SearchBar from './components/SearchBar';
import InfoContainer from './components/InfoContainer';
import ViewContainer from './components/ViewContainer';

import PersonData from './data/people.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <SearchBar placeholder={'Search'} data={PersonData}/>
        <h1>The Campaign Atlas</h1>
        <div className='viewBar'>

        </div>
      </header>
      <div className="App-body">
        <InfoContainer />
        <ViewContainer />
      </div>
    </div>
  );
}

export default App;
