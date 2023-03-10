# intersection-observer
Use intersection observer API to load more content as the user scrolls.

This web app was built using the following technologies and services:
* React
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
* [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
* [OMDB API](https://www.omdbapi.com/)

The intention of this project is to test the intersection observer API for lazy loading more content.
In this case the user can search for a movie or series title which are then presented ona grid.

## How to start
* Obtain an api key from [OMDB](https://www.omdbapi.com/) to use their movies database api.
* Create a `credentials.js` under the `src` folder.
* The credentials should look like the following code.
    ```
      export default {
          omdbApiKey: [OMDB_API_KEY]
      }
    ```
* Run `npm install`.
* Run `npm run dev`. 

## Search Page
![Search main page](https://github.com/frankesau/intersection-observer/blob/main/public/search.jpg)

## Search Results
![Search main page](https://github.com/frankesau/intersection-observer/blob/main/public/searchresult.jpg)
