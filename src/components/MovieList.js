const data = new Firebase('https://sweltering-fire-733.firebaseio.com/movies/');
const removeMovie = (id) => {
    console.log(id);
    data.child(id).remove();
}
const MovieList = (props) => {

    const movieItems = props.movies.map( (movie, i) => {
        return (
            <li className="list-group-item movie-list-item" key={i}>
                <a href={movie.link} className="metadata-wrapper">
                    {
                        movie.poster &&
                        <div className="movie-poster">
                            <img src={movie.poster} />
                        </div>
                    }
                    <span className="title">{movie.title}</span>
                </a>
                <div className="action-wrapper">
                    <span className="badge">Rating: {movie.rating}</span>
                    { movie.watched && <span className="badge watched">Watched</span> }
                    <button className="remove button btn" onClick={() => { removeMovie(movie.dbId) }}>Remove</button>
                </div>
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
