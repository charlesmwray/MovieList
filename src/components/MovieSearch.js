const MovieSearch = (props) => {
    /* TODO: reset input value after search */
    const setQueryString = function(e) {
        props.setQueryString(e.target.value);
    }
    return (
        <div className="search-container">
            <div className="search-input-container">
                <label className="label" for="search-input">Search for movie</label>
                <input className="search-input" type="text" id="search-input" onKeyUp={e => setQueryString(e)}/>
                <button onClick={props.searchForMovie}>Search</button>
            </div>
            <h5>{props.status}</h5>
        </div>
    )
}
export default MovieSearch;
