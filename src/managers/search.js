import config from "../config.js";
import credentials from "../credentials.js";

const searchEndpoint = config.searchEndpoint;
const apiKey = credentials.omdbApiKey;

export default function fetchSearch ({query}) {
    let url = searchEndpoint.replace('{apikey}', apiKey);
    url += `&s=${query}`;

    const formatResponse = (searchResponse) => {
        if (searchResponse.Response === 'True') {
            return searchResponse.Search;
        }

        return [];
    }

    return fetch(url)
        .then((response) => response.json().then(formatResponse));
}