import React, { useState, useEffect, useMemo } from "react";
import Axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import InfoContainer from './components/InfoContainer';
import ViewContainer from './components/ViewContainer';

function App() {

    // Set up backend data states
    const [personData, setPersonData] = useState([]);
    const [factionData, setFactionData] = useState([]);
    const [placeData, setPlaceData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [thingData, setThingData] = useState([]);
    const [entityData, setEntityData] = useState([]);
    const [creatureData, setCreatureData] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/people/')
            .then(response => setPersonData(response.data));
        Axios.get('http://localhost:3001/factions/')
            .then(response => setFactionData(response.data));
        Axios.get('http://localhost:3001/places/')
            .then(response => setPlaceData(response.data));
        Axios.get('http://localhost:3001/events/')
            .then(response => setEventData(response.data));
        Axios.get('http://localhost:3001/things/')
            .then(response => setThingData(response.data));
        Axios.get('http://localhost:3001/entities/')
            .then(response => setEntityData(response.data));
        Axios.get('http://localhost:3001/creatures/')
            .then(response => setCreatureData(response.data));
    }, []);

    const allData = useMemo( () => {
        const data = [...personData, ...factionData, ...placeData, ...eventData, ...thingData, ...entityData, ...creatureData];
        data.sort((a, b) => {
            let na = a.name.toLowerCase(),
                nb = b.name.toLowerCase();
            return na.localeCompare(nb);
        });
        return data;
    }, [personData, factionData, placeData, eventData, thingData, entityData, creatureData]);

    // Set up current data tracker and info controller
    const [infoControl, setInfoControl] = useState({
        page: "main",
        search: "",
        filterType: "clear",
        filterText: "Filter Search"
    });

    // Change data tracker upon user request

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

    function handlePageChange(pageId, dataType) {
        let pageRoute = '';
        switch (dataType) {
            case 'person':
                pageRoute = 'people';
                break;
            case 'entity':
                pageRoute = 'entities';
                break;
            default:
                pageRoute = dataType + 's';
        }
        
        setInfoControl( (prevValue) => {
            return {
                ...prevValue,
                page: pageRoute + '/' + pageId
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
            onRedirect={handlePageChange}
        />
        <ViewContainer />
        </div>
    </div>
    );
}

export default App;
