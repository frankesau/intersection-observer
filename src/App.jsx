import {useState, useEffect, useRef} from 'react'
import fetchSearch from "./managers/search.js";
import {intersectionObserver, observe, disconnect} from "./managers/intersectionObserver.js";
import {get as locales} from "./assets/en-En.js";
import './App.css'

let lazyLoadObserver;
let searchPage = 0;

function App() {
    const [count, setCount] = useState(0);
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState('');
    const currentObservableElementRef = useRef(null);

    const searchInput = () => {
        const query = document.querySelector('.input').value;
        const page = ++searchPage;

        fetchSearch({
            query,
            page
        }).then((response) => {
            const newSearchResult = [...searchResult, ...response]

            setSearchText(locales('searchResult', '{query}', query));
            setSearchResult(newSearchResult);
        })
    };

    const onSearch = () => {
        setSearchResult([]);
        setSearchText('');
        setCount(0);
        searchPage = 0;

        searchInput();
    };

    useEffect(() => {
        const resultCount = searchResult.length;

        if (resultCount > 0) {
            if (lazyLoadObserver) {
                lazyLoadObserver.disconnect();
            }

            lazyLoadObserver = intersectionObserver({onIntersectionCallback});
            const currentObservableElement = currentObservableElementRef.current

            if (currentObservableElement) {
                observe(currentObservableElement);
            }

        }

        return () => {
            if (lazyLoadObserver) {
                disconnect();
            }
        }
    }, [searchResult, currentObservableElementRef]);

    const onIntersectionCallback = (entries, observer) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
            observer.disconnect();
            searchInput();
        }
    }

    return (
        <main className="search">
            <h1>Search</h1>
            <section className="search-view">
                <div className="search-input">
                    <input className="input"/>
                    <button
                        className="button"
                        onClick={onSearch}
                    >Search
                    </button>
                </div>
                <div className="search-result">
                    <h2>{searchText}</h2>
                    <div className="search-grid">
                        {searchResult.map((movie, index) => {
                            return (
                                <div className="asset"
                                     key={movie.imdbID}
                                     ref={index === searchResult.length - 1 ? currentObservableElementRef : null}>
                                    <img alt={`Poster for ${movie.Title}`} className="asset-poster" src={movie.Poster}/>
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
