const MovieSearchResult = (props) => {
    const setQueryString = function(e) {
        props.setQueryString(e.target.value);
    }
    return (
        <div className="search-result">
            <span className="title">
                {props.title}
            </span>
            <span className="year">
                {props.year}
            </span>
            <button
                onClick={props.addMovie}
                id="add-movie-button"
                aria-labeledby="add-search-result-label"
            >+</button>
            <button
                onClick={props.resetSearch}
                aria-labeledby="cancel-search-result-label"
            >Cancel</button>
            <span className="util accessible-text" id="add-search-result-label">Add {props.title}, {props.year}</span>
            <span className="util accessible-text" id="cancel-search-result-label">Cancel {props.title}, {props.year}</span>
        </div>
    )
}
export default MovieSearchResult;
