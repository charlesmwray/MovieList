import data from '../data/firebase';
const removeMovie = (id, title) => {
    if (confirm("Remove " + title + "?") == true) {
         data.child(id).remove();
    }
}
const MovieList = (props) => {
    const toggleEditForm = function(movie) {
        props.toggleEditForm(movie);
    }
    const movieItems = props.movies.map( (movie, i) => {
        return (
            <li className="list-group-item movie-list-item" key={i}>
                <div className="poster">
                    <img src={movie.poster} />
                    <div className="year">{movie.year}</div>
                </div>
                <div className="metadata-wrapper">
                    <a href={movie.link} className="title" target="_blank">
                        {movie.title}
                    </a>
                    <div className="notes">{movie.notes}</div>
                </div>
                <div className="action-wrapper">
                    Rating: {movie.myRating} { movie.watched && <span className="watched">Watched</span> }
                    <div className="button-group">
                        <button className="btn" onClick={() => { toggleEditForm(movie) }}>Edit</button>
                        <button className="remove button btn" onClick={() => { removeMovie(movie.dbId, movie.title) }}>X</button>
                    </div>
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
