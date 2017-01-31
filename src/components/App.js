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
            formattedMovies.push({
                link:    snapshot.val()[keys[i]].url,
                rating:  snapshot.val()[keys[i]].rating,
                title:   snapshot.val()[keys[i]].title,
                id:      snapshot.val()[keys[i]].id,
                poster:  snapshot.val()[keys[i]].poster === 'N/A' ? null : snapshot.val()[keys[i]].poster,
                dbId:    keys[i],
                watched: snapshot.val()[keys[i]].watched,
                notes:   snapshot.val()[keys[i]].notes,
                year:    snapshot.val()[keys[i]].year
            });
          }

          setMovies(formattedMovies.reverse());

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

                var saveData = result;

                saveData.id = result.imdbID,
                saveData.title = result.Title,
                saveData.rating = 0,
                saveData.watched = false,
                saveData.url = 'http://www.imdb.com/title/' + result.imdbID,
                saveData.poster = result.Poster,
                saveData.year = result.Year,
                saveData.notes = '';

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
        });
        document.getElementById('search-input').value = '';
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
                resetSearch();
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
