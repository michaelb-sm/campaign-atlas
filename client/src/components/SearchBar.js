import React, { useState } from "react";
import './SearchBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home"

function SearchBar({infoControl, data, onHome, onFilter, onSearch, onPage}) {
    const [searchText, setSearchText] = useState("");
    const [searchCandidates, setSearchCandidates] = useState([]);

    function handleUserInput(event) {
        const inputText = (event.target.value).toLowerCase();
        setSearchText(inputText);

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
            <button className='blockButton' onClick={onHome}>
                <HomeIcon />
            </button>

            {/* Search Filter Dropdown Menu */}
            <Dropdown as={ButtonGroup} onSelect={(eventKey, event) => {onFilter(eventKey, event.target.text)}}>
                <Dropdown.Toggle split variant='rounded-light'/>
                <div className={`filterField ${infoControl.filterType === "clear" ? "filterPlaceholder" : ""}`}> {infoControl.filterText} </div>
                <Dropdown.Menu variant='rounded-light'>
                    <Dropdown.Item eventKey="clear">Clear Filter</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="person">Person</Dropdown.Item>
                    <Dropdown.Item eventKey="faction">Faction</Dropdown.Item>
                    <Dropdown.Item eventKey="place">Place/Location</Dropdown.Item>
                    <Dropdown.Item eventKey="event">Event</Dropdown.Item>
                    <Dropdown.Item eventKey="thing">Item/Material</Dropdown.Item>
                    <Dropdown.Item eventKey="entity">God/Entity</Dropdown.Item>
                    <Dropdown.Item eventKey="creature">Creature</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Searchbar */}
            <div className='searchInputs'>
                <div className='searchField'>
                    <input type="text" name="search" placeholder="Search" value={searchText} onChange={handleUserInput} />
                    <button 
                        className='searchButton' 
                        onClick={() => {
                            onSearch(searchText);
                            setSearchText("");
                            setSearchCandidates([]);
                        }}
                    >
                        <SearchIcon />
                    </button>
                </div>

                {/* Display possible search results */}
                {searchCandidates.length !== 0 && (
                    <div className='searchCandidates'>
                        {searchCandidates.slice(0, 10).map((value, key) => {
                            return <button 
                                className='searchItem'
                                name={value.name}
                                onClick={(event) => {
                                    onPage(event.target.name);
                                    setSearchText("");
                                    setSearchCandidates([]);
                                }}
                                > 
                                {value.name} 
                            </button>
                        })}
                    </div>
                )}
            </div>

        </div>
    );
}

export default SearchBar;