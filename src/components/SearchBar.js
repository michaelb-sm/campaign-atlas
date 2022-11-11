import './SearchBar.css';
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home"

function SearchBar({placeholder, data}) {
    return (
        <div className='search'>
            <div className='homeButton'>
                <HomeIcon />
            </div>
            <div className='searchInputs'>
                <div className='searchField'>
                    <input type="text" placeholder={placeholder}/>
                    <div className='searchButton'>
                        <SearchIcon />
                    </div>
                </div>
                <div className='searchCandidates'>
                    {data.map((value, key) => {
                        return <button className='searchItem'>{value.name}</button>
                    })}
                </div>
            </div>
            <div className='filterField'></div>
        </div>
    );
}

export default SearchBar;