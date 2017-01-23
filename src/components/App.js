import React, {Component} from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';

import MovieList from './MovieList.js';
import MovieSearch from './MovieSearch.js';
import MovieSearchResult from './MovieSearchResult';

const data = new Firebase('https://sweltering-fire-733.firebaseio.com/movies/');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [{title:'Loading'}],
            query: '',
            queryState: '',
            showSerchResult: false,
            searchResult: {},
        }

    }

    componentDidMount() {

        const setMovies = (arr) => {
            this.setState({
                movies: arr,
            });
        }

        data.on('value', function(snapshot) {
          var keys = Object.keys(snapshot.val());
          var formattedMovies = [];

          for (var i = 0; i < keys.length; i++) {
            var link = snapshot.val()[keys[i]].url;
            var rating = snapshot.val()[keys[i]].rating;
            var title = snapshot.val()[keys[i]].title;
            var id = snapshot.val()[keys[i]].id;
            var poster = snapshot.val()[keys[i]].poster === 'N/A' ? null : snapshot.val()[keys[i]].poster;
            var watched = snapshot.val()[keys[i]].watched;

            formattedMovies.push({
                link:link,
                rating:rating,
                title:title,
                id:id,
                poster:poster,
                dbId:keys[i],
                watched:watched
            });

          }

          setMovies(formattedMovies);

        }, function (errorObject) {
            // TODO: add error state to UI
            console.log("The read failed: " + errorObject.code);

        });

    }
    setQueryString(str) {
        this.setState({
            query: str
        })
    }
    searchForMovie(e) {
        e.preventDefault();

        var query = 'https://www.omdbapi.com/?t=' + this.state.query;

        this.setState({
            queryState: 'Searching'
        })

        const setQueryState = (str) => {
            this.setState({
                queryState: str
            });
        }

        const setSearchResult = (obj) => {
            this.setState({
                searchResult: obj,
                showSerchResult: true
            });
            document.getElementById('add-movie-button').focus();
        }

        $.ajax(query).done(function(p_oXHR, p_sStatus) {
            var result = p_oXHR;

            if (result.Response === "True") {

                setQueryState('Search complete');

                var saveData = {
                    id: result.imdbID,
                    title: result.Title,
                    rating: 0,
                    watched: false,
                    url: 'http://www.imdb.com/title/' + result.imdbID,
                    poster: result.Poster,
                    year: result.Year
                }

                setSearchResult(saveData);

            } else {

                setQueryState('Movie not found.');

            }

        }).fail(function() {

            setQueryState('Error. Please try again.');

        });

    }
    resetSearch() {
        this.setState({
            query: '',
            queryState: '',
            showSerchResult: false,
            searchResult: {},
        })
    }
    addMovie() {
        const setQueryState = (str) => {
            this.setState({
                queryState: str
            });
        }
        const resetSearch = () => {
            this.resetSearch();
        }
        const saveData = this.state.searchResult;
        data.push(saveData, function(error) {
            if (!error) {
                setQueryState('Saved');
                setTimeout(function(){
                    resetSearch();
                }, 3000);
            } else {
                setQueryState('Save error.');
            }
        });
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-3 hidden-xs">
                    <h1 className="header-text">
                        Movie <br/>
                        List
                    </h1>
                </div>
                <div className="col-xs-12 col-sm-9">
                    <header className="header">
                        <h1 className="header-text visible-xs-*">Movie List</h1>
                        <MovieSearch
                            status={this.state.queryState}
                            query={this.state.query}
                            searchForMovie={this.searchForMovie.bind(this)}
                            setQueryString={this.setQueryString.bind(this)}
                            />
                    </header>
                    {
                        this.state.showSerchResult &&
                        <MovieSearchResult
                            title={this.state.searchResult.title}
                            year={this.state.searchResult.year}
                            addMovie={this.addMovie.bind(this)}
                            resetSearch={this.resetSearch.bind(this)}
                            />
                    }
                    <MovieList movies={this.state.movies} />
                </div>
            </div>
        )
    }

}

export default App;
