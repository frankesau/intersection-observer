import {useState, useEffect, useRef} from 'react'
import fetchSearch from "./managers/search.js";
import {intersectionObserver, observe, disconnect} from "./managers/intersectionObserver.js";
import {get as locales} from "./assets/en-En.js";
import './App.css'
import {IconSearch} from '@tabler/icons-react';

let lazyLoadObserver;

function App() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const currentObservableElementRef = useRef(null);
    const searchPage = useRef(0);

    const searchInput = () => {
        const query = document.querySelector('.input').value; // new window.FormData(event.target)
        const page = ++searchPage.current;

        setIsLoading(true);
        fetchSearch({
            query,
            page
        }).then((response) => {
            const newSearchResult = [...searchResult, ...response]

            setIsLoading(false);
            setSearchText(locales('searchResult', '{query}', query));
            setSearchResult(newSearchResult);
        })
    };

    const onSearch = () => {
        setSearchResult([]);
        setSearchText('');
        searchPage.current = 0;

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
            <section className={searchResult.length >= 3 ? 'search-view scrolled' : 'search-view'}>
                <section className="search-header">
                    <h1 className="search-title">Search</h1>
                    <div className="search-input">
                        <section className="search-input__box">
                            <IconSearch className="icon"/>
                            <input className="input" name="query" placeholder={locales('searchInputPlaceholder')}/>
                        </section>
                        <button
                            className="button"
                            onClick={onSearch}
                        >Search
                        </button>
                    </div>
                </section>
                <section className="search-result">
                    <h2 className="search-result-title">{searchText}</h2>
                    <div className="search-grid">
                        {searchResult.map((movie, index) => {
                            return (
                                <div className="asset"
                                     key={movie.id}
                                     ref={index === searchResult.length - 1 ? currentObservableElementRef : null}>
                                    <img
                                        alt={`Poster for ${movie.title}`}
                                        className="asset-poster"
                                        src={movie.image}
                                        onLoad={}
                                    />
                                    <h3 className="asset-title">{movie.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </section>

            <div className={`spinners ${isLoading ? 'spin' : ''}`}>
                <div className="spinner"></div>
            </div>
        </main>
    )
}

export default App
