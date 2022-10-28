import './SearchBar.css';

function SearchBar({placeholder, data}) {
    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type="text" placeholder={placeholder}/>
                <div className='searchIcon'></div>
                <div className='filterFields'></div>
            </div>
            <div className='searchCandidate'></div>
        </div>
    );
}

export default SearchBar;