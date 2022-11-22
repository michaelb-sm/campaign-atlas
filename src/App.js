import React, { useState, useEffect, useMemo } from "react";
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

    // Import Data
    const allData = useMemo(() => [...PersonData, ...FactionData, ...PlaceData, ...EventData, ...ThingData, ...EntityData, ...CreatureData], [])
    allData.sort((a, b) => {
    let na = a.name.toLowerCase(),
        nb = b.name.toLowerCase();

        return na.localeCompare(nb);
    });

    // Set up data tracker and input controller
    const [curData, setCurData] = useState(allData[0]);
    const [infoControl, setInfoControl] = useState({
        page: "main",
        search: "",
        filterType: "clear",
        filterText: "Filter Search"
    })

    // Change data tracker upon user request
    useEffect( () => {
        if (infoControl.page !== "main") {
            setCurData(allData.find( (value) => value.name === infoControl.page));
        }
    }, [allData, infoControl]);

    function handleHome() {
        setInfoControl({
            page: "main",
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

    function handlePageChange(page) {
        setInfoControl( (prevValue) => {
            return {
                ...prevValue,
                page: page
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
            onPage={handlePageChange}
        />
        <h1>The Campaign Atlas</h1>
        <div className='viewBar'>

        </div>
        </header>
        <div className="App-body">
        <InfoContainer 
            infoControl={infoControl}
            refData={allData}
            data={curData}
            onRedirect={handlePageChange}
        />
        <ViewContainer />
        </div>
    </div>
    );
}

export default App;
