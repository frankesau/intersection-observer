import config from "../config.js";
import credentials from "../credentials.js";

const searchEndpoint = config.searchEndpoint;
const apiKey = credentials.omdbApiKey;

export default function fetchSearch({query, page}) {
    let url = new URL(searchEndpoint.replace('{apikey}', apiKey));
    const params = {
        s: query,
        page
    };

    for (const key in params) url.searchParams.append(key, params[key]);

    const formatResponse = (searchResponse) => {
        if (searchResponse.Response === 'True') {
            return searchResponse.Search.map((searchItem, index) => {
                return {
                    id: searchItem.imdbID,
                    title: searchItem.Title,
                    image: searchItem.Poster
                }

            });
        }

        return [];
    }

    return fetch(url)
        .then((response) => response.json().then(formatResponse));
}