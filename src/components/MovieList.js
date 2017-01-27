const data = new Firebase('https://sweltering-fire-733.firebaseio.com/movies/');
const removeMovie = (id) => {
    console.log(id);
    data.child(id).remove();
}
const MovieList = (props) => {
    const filter = props.filter;
    const movieItems = props.movies.map( (movie, i) => {
        return (
            <div key={i}>
            {filter}
                { !movie.filter &&
                    <li className="list-group-item movie-list-item">
                        {
                            movie.poster &&
                            <div className="poster">
                                <img src={movie.poster} />
                                <div className="year">{movie.year}</div>
                            </div>
                        }
                        <div className="metadata-wrapper">
                            <a href={movie.link} className="title" target="_blank">
                                {movie.title}
                            </a>
                            <div className="notes">{movie.notes}</div>
                        </div>
                        <div className="action-wrapper">
                            <span className="badge">Rating: {movie.rating}</span>
                            { movie.watched && <span className="badge watched">Watched</span> }
                            <button className="remove button btn" onClick={() => { removeMovie(movie.dbId) }}>Remove</button>
                        </div>
                    </li>
                }
            </div>
        )
    });
    return (
        <ul className="list-group movie-list">
            {movieItems}
        </ul>
    )
}

export default MovieList;
