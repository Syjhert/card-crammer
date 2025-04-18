# Card Crammer

- Card Crammer is a flashcard web application that allows users to create, manage, and review study folders filled with custom flashcards. Whether you're studying for exams or brushing up on concepts, Card Crammer helps streamline your review process with a minimal, RESTful API-backed system.

- All RESTful API endpoints were tested using Postman to ensure correct functionality and error handling.
- Base URL: http://localhost:PORT/api/folders

| Method | Endpoint | Description                     | Sample Body (JSON)                                                                 |
|--------|----------|---------------------------------|-----------------------------------------------------------------------------------|
| GET    | /        | Fetch all folders               | -                                                                                 |
| GET    | /:id     | Fetch a specific folder by ID   | -                                                                                 |
| POST   | /        | Create a new folder             | ```{ "name": "Math Notes" }```                                        |
| PATCH  | /:id     | Update a folder's name and flashcards | ```{ "name": "Updated Folder", "flashcards": [{"question": "question", "answer": "ans"}] }``` |
| DELETE | /:id     | Delete a folder by ID           | -                                                                                 |

| Code            | Description                          |
|-----------------|--------------------------------------|
| 200 OK          | Successful read, update, or delete   |
| 201 Created     | New folder successfully created      |
| 400 Bad Request | Invalid or missing input             |
| 404 Not Found   | Folder not found                     |

| Library/Tech                | Purpose                                                  |
|-----------------------------|----------------------------------------------------------|
| Node.js                     | JavaScript runtime for server-side logic                 |
| Express.js                  | Web framework for creating RESTful APIs                 |
| MongoDB                     | NoSQL database for storing folders and flashcards       |
| Mongoose                    | ODM library for MongoDB in Node.js                      |
| dotenv                      | Loads environment variables from a `.env` file          |
| morgan                      | HTTP request logger middleware for development          |
| express.json()              | Parses incoming JSON request bodies                     |
| express-mongo-sanitize      | Prevents MongoDB operator injection attacks             |
| xss-clean                   | Sanitizes user input to prevent XSS attacks             |
| CORS headers (manually set) | Allows cross-origin requests during development         |
