const enEn =  {
    searchResult: 'Results for {searchText}'
}

export function get (name, replace, replaceText) {
    return enEn[name].replace(replace, replaceText);
}