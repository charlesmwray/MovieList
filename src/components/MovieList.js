const MovieList = (props) => {
    const movieItems = props.movies.map( (movie, i) => {
        return (
            <li className="list-group-item" key={i}>
                <a href={movie.link}>{movie.title}</a>
                <span className="badge">{movie.rating}</span>
            </li>
        )
    });
    return (
        <div>
            <h2>Movie List</h2>
            <ul className="list-group">
                {movieItems}
            </ul>
        </div>
    )
}

export default MovieList;
