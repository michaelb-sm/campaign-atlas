import React, { useState } from "react";
import './App.css';
import SearchBar from './components/SearchBar';
import InfoContainer from './components/InfoContainer';
import ViewContainer from './components/ViewContainer';

import PersonData from './data/people.json';
import FactionData from './data/factions.json';
import PlaceData from './data/places.json';
import EventData from './data/events.json';
import ThingData from './data/things.json';
import EntityData from './data/entities.json';
import CreatureData from './data/creatures.json';

function App() {
  // const allData = PersonData.concat(FactionData).concat(PlaceData).concat(EventData).concat(ThingData).concat(EntityData).concat(CreatureData);
  const allData = [...PersonData, ...FactionData, ...PlaceData, ...EventData, ...ThingData, ...EntityData, ...CreatureData]
  allData.sort((a, b) => {
    let na = a.name.toLowerCase(),
        nb = b.name.toLowerCase();
    
        return na.localeCompare(nb);
  });

  const [filterType, setfilterType] = useState({
    type: "clear",
    text: "Filter Search"
  });

  function handleFilterChange(key, filterText) {
        if (key === "clear") {
            setfilterType({
                type: "clear",
                text: "Filter Search"
            });
        } else {
            setfilterType({
                type: key,
                text: filterText
            });
        }
    }

  return (
    <div className="App">
      <header className="App-header">
      
        <SearchBar 
          placeholder={'Search'} 
          filterType={filterType}
          onFilter={handleFilterChange} 
          data={allData}
        />
        <h1>The Campaign Atlas</h1>
        <div className='viewBar'>

        </div>
      </header>
      <div className="App-body">
        <InfoContainer 
            data={filterType.text === "Filter Search" ? allData : allData.filter( (value) => {
                return value.type === filterType.type;
            })}
        />
        <ViewContainer />
      </div>
    </div>
  );
}

export default App;
