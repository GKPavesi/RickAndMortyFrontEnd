const Search = ({ handleSearch, setSearchName, searchName }) => {

    return (
        <div className='input-container'>
            <input
                type="text"
                placeholder='Search characters'
                id='search-input'
                value={searchName}
                onChange={e => setSearchName(e.target.value)} />
            <button id='search-button' onClick={() => handleSearch()}>Search</button>
        </div>
    )
}

export default Search