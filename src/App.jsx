import {useState} from 'react'
import fetchSearch from "./managers/search.js";
import {get as locales} from "./assets/en-En.js";
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0);
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState('');

    const searchInput = () => {
        const inputText = document.querySelector('.input').value;

        fetchSearch({
            query: inputText
        }).then((response) => {
            setSearchText(locales('searchResult', '{searchText}', inputText));
            setSearchResult(response);
        })
    };

    return (
        <main className="search">
            <h1>Search</h1>
            <section className="search-view">
                <div className="search-input">
                    <input className="input"/>
                    <button
                        className="button"
                        onClick={searchInput}
                    >Search
                    </button>
                </div>
                <div className="search-result">
                    <h2>{searchText}</h2>
                    <div className="search-grid">
                        {searchResult.map((movie) => {
                            return (
                                <div className="asset" key={movie.imdbID}>
                                    <img className="asset-poster" src={movie.Poster}/>
                                    <h3 className="asset-title">{movie.Title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </section>
        </main>
    )
}

export default App
