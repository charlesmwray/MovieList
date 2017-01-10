const MovieSearch = (props) => {
    /* TODO: reset input value after search */
    const setQueryString = function(e) {
        props.setQueryString(e.target.value);
    }
    return (
      <div>
        <h2>Search</h2>
        <div className="row">
            <div className="col-xs-12 col-sm-4">
                <input type="text" id="imdb-link" onKeyUp={e => setQueryString(e)}/>
            </div>
            <div className="col-xs-12 col-sm-4">
                <button onClick={props.searchForMovie} className="col-xs-12 col-sm-4">Search</button>
            </div>
        </div>
        <h3>{props.status}</h3>
      </div>
    )
}
export default MovieSearch;
