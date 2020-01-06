# Metro Transit App

Metro Transit app uses live data from [Metro Transit](https://www.metrotransit.org/nextrip/) to show route, direction, stop and respective departure details

## Prerequisites

 You need to have Node.js and npm or yarn installed

## Installation

1) Clone the repository from git to your local folder.
2) Go to the folder in your terminal. Example cd my-retail-app
### npm install
This will download and install all dependencies needed for this app.

## Available Scripts

In the project directory, you can run:

## Run the demo

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Run tests

### `npm test`

Launches the test runner in the interactive watch mode.<br />

## Deployment

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Code information

index.js - This is the main entry point of the app.
App.js - This component renders route, direction, stop and respective departure details.
departureList.js - This component renders respective departure details from the route, direction, stop selections.
App.test.js - This contains all tests.
apiCalls - This contains method to fetch the data.
