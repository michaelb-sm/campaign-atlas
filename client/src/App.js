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
    const [curData, setCurData] = useState();
    const [infoControl, setInfoControl] = useState({
        page: "main",
        search: "",
        filterType: "clear",
        filterText: "Filter Search"
    });

    useEffect(() => {
        if (infoControl.page !== "main") {
            Axios.get('http://localhost:3001/' + infoControl.page)
                .then(response => setCurData(response.data));
        }
    }, [infoControl.page]);

    // Handle all main page user requests
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

    // Entry Navigation and Data Handling 

    function handleNewEntry(newName, newType) {
        let pageRoute = '';
        switch (newType) {
            case 'person':
                pageRoute = 'people';
                break;
            case 'entity':
                pageRoute = 'entities';
                break;
            default:
                pageRoute = newType + 's';
        }
        const newEntry = {
            name: newName,
            dataType: newType,
            status: '',
            main: []
        };
        console.log('Posting ' + newName + ' to ' + pageRoute);
        Axios.post('http://localhost:3001/' + pageRoute + '/add', newEntry)
            .then(response => {
                handleDataChange(pageRoute);
                handlePageChange(response.data._id, response.data.dataType)
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

    function handleUpdate(updatedData) {
        Axios.post('http://localhost:3001/' + infoControl.page + '/update', updatedData)
            .then(response => {
                handleDataChange(infoControl.page.split('/')[0]);
                Axios.get('http://localhost:3001/' + infoControl.page)
                    .then(response => setCurData(response.data));
            });
    }

    function handleDeletion() {
        Axios.delete('http://localhost:3001/' + infoControl.page)
            .then(response => {
                handleDataChange(infoControl.page.split('/')[0]);
                handleHome();
            });
    }

    function handleDataChange(route) {
        Axios.get('http://localhost:3001/' + route + '/')
            .then(response => {
                switch (route) {
                    case 'people':
                        setPersonData(response.data);
                        break;
                    case 'factions':
                        setFactionData(response.data)
                        break;
                    case 'places':
                        setPlaceData(response.data)
                        break;
                    case 'events':
                        setEventData(response.data)
                        break;
                    case 'things':
                        setThingData(response.data)
                        break;
                    case 'entities':
                        setEntityData(response.data)
                        break;
                    case 'creatures':
                        setCreatureData(response.data)
                        break;
                    default:
                        console.log("New data indeterminate: Please check what data was just changed");
                }
            })
            .catch(err => console.log(err));
    }

    // JSX

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
            curData={curData}
            refData={allData}
            onCreate={handleNewEntry}
            onRedirect={handlePageChange}
            onUpdate={handleUpdate}
            onDelete={handleDeletion}
        />
        <ViewContainer />
        </div>
    </div>
    );
}

export default App;
