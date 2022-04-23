# The Movie DB Mobile App by Eden

**Here is my Movie DB App (React Native CLI + TMDB API) !** 😁

It's a small app to test React Native CLI. This IMDB-like app lets the users find movies by category, see movie details (with rating, release date, synopsis, genre) and launch their trailer (with Youtube video integrations) and search for specific movies or TV shows.

[Live Demo](https://youtu.be/LYErhx-9kIk)

## How to run it

First, you have to add your TMDB API proper key in services > services.js > line 4

`const apiKey = 'YOUR_API_KEY';`

Then install all dependencies with npm or yarn. And launch the app (you need Android Studio &/or Xcode to launch it on their emulators).

`yarn react-native run-ios` OR `yarn react-native run-android`

## Built with

- **Frontend** : React Native (with gesture handler, image slider box, star rating, vector icons...) and react-native-youtube library to launch youtube videos on the app.
- **Backend** : This app is only using The Movie Database API (with Axios)

## License

This app was made by me, please credit **©EdCh-Lo** if using it.
