const MovieList = (props) => {
    const movieItems = props.movies.map( (movie, i) => {
        return (
            <li className="list-group-item movie-list-item" key={i}>
                <a href={movie.link}>
                    <div className="metadata-wrapper">
                        <div className="movie-poster">
                            <img src={movie.poster} />
                        </div>
                        <span className="title">{movie.title}</span>
                    </div>
                    <div className="rating-wrapper">
                        <span className="badge">Rating: {movie.rating}</span>
                    </div>
                </a>
            </li>
        )
    });
    return (
        <div>
            <h2>Movie List</h2>
            <ul className="list-group movie-list">
                {movieItems}
            </ul>
        </div>
    )
}

export default MovieList;
