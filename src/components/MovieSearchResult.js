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
            <button onClick={props.addMovie} id="add-movie-button">+</button>
            <button onClick={props.resetSearch}>Cancel</button>
        </div>
    )
}
export default MovieSearchResult;
