# Weather-Monster

## Overview
The project is used by different institutions to monitor weather temperature and get forecasts.

## Technologies
The project is built with the following technologies:
- NodeJS
- Express
- PostgreSQL
- Sequelize

### Documentation
The Weather Monster Application backend services documentation on `Postman` can be found [here](https://documenter.getpostman.com/view/15642679/UzBpL5yB)

## Setting up the project and Connect with Github
1. Clone project from [Github](https://github.com/ijoe7/weather-monster.git)
2. cd into project's root directory on terminal
3. Create your own github branch `git checkout -b {branch name}`
4. Ensure you have the latest stable code `git pull origin main`

## Setting up and connecting to PostgreSQL
1. Install PostgreSQL
2. Create a new PostgreSQL database `createdb {weathermonster}`

## Running the project locally
1. Navigate to the project's root directory on terminal
2. Run `npm install`
3. Run `npm start`
4. Or Run `npm run dev` (Nodemon will automatically restart the server when changes are made)
5. Open the browser or `postman` and navigate to `http://localhost:3000`

## Run tests
1. Create a new PostgreSQL database `createdb {testdb}`
1. Navigate to the project's root directory on terminal
2. Run `npm test` or `npm run test` on the terminal

