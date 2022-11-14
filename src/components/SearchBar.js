import React, { useState } from "react";
import './SearchBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home"

function SearchBar({placeholder, data}) {
    const [filterType, setFilterType] = useState('Filter Search');
    const [searchCandidates, setSearchCandidates] = useState([]);

    function handleFilterChange(eventKey, event) {
        if (eventKey === 'clear') {
            setFilterType('Filter Search');
        } else {
            setFilterType(event.target.text);
        }
    }

    function handleUserInput(event) {
        const inputText = (event.target.value).toLowerCase();

        // Filter data to display it as quick links under the search bar
        const inputFilter = data.filter( (value) => {
            return (value.name).toLowerCase().includes(inputText);
        });

        if (inputText === "") {
            setSearchCandidates([])
        } else {
            setSearchCandidates(inputFilter)
        }
    }

    return (
        <div className='search'>

            {/* Home Button */}
            <button className='homeButton'>
                <HomeIcon />
            </button>

            {/* Search Filter Dropdown Menu */}
            <Dropdown as={ButtonGroup} onSelect={handleFilterChange}>
                <Dropdown.Toggle split variant='rounded-light'/>
                <div className={`filterField ${filterType === "Filter Search" ? "filterPlaceholder" : ""}`}> {filterType} </div>
                <Dropdown.Menu variant='rounded-light'>
                    <Dropdown.Item eventKey='clear'>Clear Filter</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey='person'>Person</Dropdown.Item>
                    <Dropdown.Item eventKey='faction'>Faction</Dropdown.Item>
                    <Dropdown.Item eventKey='place'>Place/Location</Dropdown.Item>
                    <Dropdown.Item eventKey='event'>Event</Dropdown.Item>
                    <Dropdown.Item eventKey='thing'>Item/Material</Dropdown.Item>
                    <Dropdown.Item eventKey='entity'>God/Entity</Dropdown.Item>
                    <Dropdown.Item eventKey='creature'>Creature</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Searchbar */}
            <div className='searchInputs'>
                <div className='searchField'>
                    <input type="text" placeholder={placeholder} onChange={handleUserInput} />
                    <button className='searchButton'>
                        <SearchIcon />
                    </button>
                </div>

                {/* Display possible search results */}
                {searchCandidates.length !== 0 && (
                    <div className='searchCandidates'>
                        {searchCandidates.slice(0, 15).map((value, key) => {
                            return <button className='searchItem'>{value.name}</button>
                        })}
                    </div>
                )}
            </div>

        </div>
    );
}

export default SearchBar;