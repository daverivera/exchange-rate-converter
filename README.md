# Currency exchange

[![Build Status](https://travis-ci.org/daverivera/exchange-rate-converter.svg?branch=master)](https://travis-ci.org/daverivera/exchange-rate-converter)

## Access the app
The app is live in a heroku free container, so can take a while to load the first run.
Follow the next link to access to it:
[https://adyen-currency-exchange.herokuapp.com/](https://adyen-currency-exchange.herokuapp.com/)

## Available Scripts

In the project directory, you can run:

### Environment variables

The app uses a `.env` file in the root folder with the enviroment variables for the api endpoint. In order to run it locally you need to create this file, there is a sample that can be rename.
The content of the file should be like this.

```
REACT_APP_EXCHANGE_RATES_API=https://api.exchangeratesapi.io
```

When the env file is created the app can be started with

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

The app has unit test configured with jest & enzyme.

### `npm e2e`

The app has cypress configured for e2e tests.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

