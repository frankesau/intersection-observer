const enEn =  {
    searchResult: 'Results for {query}',
    searchInputPlaceholder: 'Search movies and series'
}

export function get (name, replace, replaceText) {
    return enEn[name].replace(replace, replaceText);
}