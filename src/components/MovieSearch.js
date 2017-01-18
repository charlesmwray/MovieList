const MovieSearch = (props) => {
    /* TODO: reset input value after search */
    const setQueryString = function(e) {
        props.setQueryString(e.target.value);
    }
    const searchForMovie = function(e) {
        props.searchForMovie(e);
    }
    return (
        <div className="search-container">
            <form className="search-input-container" onSubmit={e => searchForMovie(e)}>
                <label className="util accessible-text" htmlFor="search-input">Search for movie</label>
                <input className="search-input" type="text" id="search-input" onKeyUp={e => setQueryString(e)}/>
                <button type="submit">Search</button>
            </form>
            <h5>{props.status}</h5>
        </div>
    )
}
export default MovieSearch;
