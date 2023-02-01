const enEn =  {
    searchResult: 'Results for {query}'
}

export function get (name, replace, replaceText) {
    return enEn[name].replace(replace, replaceText);
}