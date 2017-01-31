const MovieSearchResult = (props) => {
    const setQueryString = function(e) {
        props.setQueryString(e.target.value);
    }
    return (
        <div className="search-result row">
            <span className="title col-xs-4">
                {props.title}
            </span>
            <span className="year col-xs-2">
                {props.year}
            </span>
            <div className="button-wrapper col-xs-6">
                <button
                    onClick={props.addMovie}
                    id="add-movie-button"
                    aria-labelledby="add-search-result-label"
                    className="btn"
                >+</button>
                <button
                    onClick={props.resetSearch}
                    aria-labelledby="cancel-search-result-label"
                    className="btn"
                >Cancel</button>
            </div>
            <span className="util accessible-text" id="add-search-result-label">Add {props.title}, {props.year}</span>
            <span className="util accessible-text" id="cancel-search-result-label">Cancel {props.title}, {props.year}</span>
        </div>
    )
}
export default MovieSearchResult;
