import React, {Component} from 'react';
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
        class StreamingItem extends Component {
            constructor(props) {
                super(props);

                this.state = {
                    webStreamingItems: []
                }
            }
            componentWillMount() {
                const base = 'http://api-public.guidebox.com/v2/movies/';
                const api = '?api_key=bbd37ad3b028476884a4610e508dd04ef6a00ac5'
                const query = base + movie.id + api;

                var details = 'd';

                const setStreamingItems= (streamingObj) => {
                    this.setState({
                        webStreamingItems: streamingObj
                    })
                }

                $.ajax({
                    url: query,
                    type: "GET",
                }).done(function(p_oXHR, p_sStatus) {
                    details = p_oXHR;
                    console.log(details);
                    if (details.subscription_web_sources.length > 0) {
                        setStreamingItems(details.subscription_web_sources);
                    }
                }).fail(function(p_oXHR, p_sStatus) {
                    // console.log(p_oXHR, p_sStatus);
                });
            }
            render() {
                const streamingItem = this.state.webStreamingItems.map( (item) => {
                    return <a href={item.link}>{item.display_name}</a>;
                });
                return <div>{streamingItem}</div>;
            }
        }
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
                    <StreamingItem />
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
