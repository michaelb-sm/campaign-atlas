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
    const allData = [...PersonData, ...FactionData, ...PlaceData, ...EventData, ...ThingData, ...EntityData, ...CreatureData]
    allData.sort((a, b) => {
    let na = a.name.toLowerCase(),
        nb = b.name.toLowerCase();

        return na.localeCompare(nb);
    });

    const [infoControl, setInfoControl] = useState({
        display: "main",
        search: "",
        filterType: "clear",
        filterText: "Filter Search"
    })

    function handleHome() {
        setInfoControl({
            display: "main",
            search: "",
            filterType: "clear",
            filterText: "Filter Search"
        });
    }

    function handleFilterChange(key, filterText) {
        if (key === "clear") {
            setInfoControl( (prevValue) => {
                return {
                    ...prevValue,
                    filterType: key,
                    filterText: "Filter Search"
                };
            });
        } else {
            setInfoControl( (prevValue) => {
                return {
                    ...prevValue,
                    filterType: key,
                    filterText: filterText
                };
            });
        }
    }

    function handleSearch(search) {
        setInfoControl( (prevValue) => {
            return {
                ...prevValue,
                search: search
            };
        });
    }

    return (
    <div className="App">
        <header className="App-header">
        
        <SearchBar 
            infoControl={infoControl}
            data={allData}
            onHome={handleHome}
            onFilter={handleFilterChange}
            onSearch={handleSearch}
        />
        <h1>The Campaign Atlas</h1>
        <div className='viewBar'>

        </div>
        </header>
        <div className="App-body">
        <InfoContainer 
            data={allData.filter( (value) => {
                return ((value.name).toLowerCase().includes(infoControl.search) && (
                    infoControl.filterType === "clear" ? true : value.type === infoControl.filterType
                ));
            })}
            // {infoControl.filterType === "clear" ? allData : allData.filter( (value) => {
            //     return value.type === infoControl.filterType;
            // })}
        />
        <ViewContainer />
        </div>
    </div>
    );
}

export default App;
