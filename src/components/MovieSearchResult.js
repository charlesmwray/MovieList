const MovieSearchResult = (props) => {
    const setQueryString = function(e) {
        props.setQueryString(e.target.value);
    }
    return (
        <div>
            <div className="search-result">
                <span className="title">
                    {props.title}
                </span>
                <span className="year">
                    {props.year}
                </span>
            </div>
            <button onClick={props.addMovie} id="add-movie-button">+</button>
        </div>
    )
}
export default MovieSearchResult;
