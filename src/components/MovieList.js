const MovieList = (props) => {
    const movieItems = props.movies.map( (movie, i) => {
        return (
            <li className="list-group-item movie-list-item" key={i}>
                <a href={movie.link}>
                    <div className="metadata-wrapper">
                        {
                            movie.poster &&
                            <div className="movie-poster">
                                <img src={movie.poster} />
                            </div>
                        }
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
        <ul className="list-group movie-list">
            {movieItems}
        </ul>
    )
}

export default MovieList;
