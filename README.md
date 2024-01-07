# Notes API Documentation

## Overview

This API provides a secure and scalable way to manage notes, including creating, reading, updating, deleting, sharing, and searching for notes.

## Technical Details

* **Framework:** Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **Rate Limiting:** Express-rate-limit middleware
* **Text Indexing:** MongoDB text indexes
* **Testing:** Jest

## Running Locally commanda:
1. Clone the repository: 
 * `git clone https://github.com/demogit220/notesApi`

2. Move to the project folder: 
*  `cd notesApi`

3. Install all the packages:
*  `npm install`

4. Setup the config file with name *.env* and paste the below code in *.env* file and enter your own `JWT_SECRET` , `DATABASE_PASSWORD`, `DATABASE` URI link which you get from mongoDB atlas.  
```
PORT=5000
DATABASE_PASSWORD=<Database_password>
DATABASE=<database_uri>
# DATABASE_LOCAL=mongodb://localhost:27017/natours

JWT_SECRET=<secret key for jwt token>
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN=90
```

5. Start the project: 
* `npm start`

6. For Linting of code: 
* `npm lint`

7. To run the tests:
* `npm test`
## Endpoints

### Authentication

* **POST /api/auth/signup**
    * Creates a new user account.
    * Request body:
        * name (string)
        * email (string)
        * password (string)
        * passwordConfirm (string)
    * Response:
        * User object
* **POST /api/auth/login**
    * Logs in to an existing user account.
    * Request body:
        * email (string)
        * password (string)
    * Response:
        * Access token (JWT)

### Notes

* **GET /api/notes**
    * Retrieves a list of notes for the authenticated user.
    * Response:
        * Array of note objects
* **GET /api/notes/:id**
    * Retrieves a specific note by ID for the authenticated user.
    * Response:
        * Note object
* **POST /api/notes**
    * Creates a new note for authenticated user
    * Request body:
        * title (string)
        * data (string)
    * Response:
        * Newly created note object
* **PUT /api/notes/:id**
    * Updates an existing note for authenticated user
    * Request body:
        * title (string)
        * data (string)
    * Response:
        * Updated note object
* **DELETE /api/notes/:id**
    * Deletes a note by ID for the authenticated user.
    * Response:
        * Success message
* **POST /api/notes/:id/share**
    * Shares a note with another user for the authenticated user.
    * Request body:
        * userId (string) - ID of the user to share with
    * Response:
        * Success message
* **GET /api/search?q=:query**
    * Searches for notes based on keywords.
    * Response:
        * Array of matching note objects

## Authentication

All note endpoints, except for signup and login, require a valid access token in the `Authorization` header (e.g., `Bearer <token>`).

Cookies are used for storing JWT token on client side 

## Rate Limiting

The API implements rate limiting to prevent excessive requests. Users are limited to a certain number of requests per minute.

## Other Features:
* **App features:** cors, helmet, mongoSanatize and xss
* **Validations for password confirm**
* **Handling uncaught exceptions**
* **Error Handling:** The API uses standard HTTP status codes to indicate success or failure.

# TODO:
    * Implementing a frontend and connecting to api
    * Implementing more robust testing
    * Implementing jwt refresh tokens

## Contact

For any questions or issues, please create a issue 🙂