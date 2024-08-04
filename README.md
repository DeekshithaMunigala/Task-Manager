# TaskManager

TaskManager is an Express.js application that provides RESTful endpoints for managing tasks. It supports operations such as creating, reading, updating, and deleting tasks. The data is stored using both an in-memory array and a PostgreSQL database.

## Features

- Create tasks
- Read all tasks
- Read a specific task by ID
- Update tasks
- Delete tasks

## Prerequisites

- Node.js
- PostgreSQL

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/taskmanager.git
    cd taskmanager
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up PostgreSQL:

    - Ensure PostgreSQL is installed and running.
    - Create a database named `test`:
    
      ```sql
      CREATE DATABASE test;
      ```
    - Update the database configuration in `database.js` if needed.

## Database Setup

1. The `database.js` file contains the setup for the PostgreSQL client and creates a `tasks` table if it does not exist:

    ```javascript
    const pg = require("pg");
    const { Client } = pg;
    const client = new Client({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "Your_Password",
      database: "test",
    });

    client
      .connect()
      .then(() => {
        client.query(
          "create table if not exists tasks(id SERIAL, name VARCHAR(25) NOT NULL);"
        );
      })
      .catch((err) => {
        console.log(err);
      });

    module.exports = { client };
    ```

## Running the Application

1. Start the server:

    ```bash
    node app.js
    ```

2. The application will be running at `http://localhost:8000`.

## API Endpoints

### Get All Tasks

- **URL:** `/tasks`
- **Method:** `GET`
- **Description:** Retrieve all tasks.
- **Response:** JSON array of tasks.

### Get Task by ID

- **URL:** `/tasks/:id`
- **Method:** `GET`
- **Description:** Retrieve a task by its ID.
- **Response:** JSON object of the task.

### Create a Task

- **URL:** `/tasks`
- **Method:** `POST`
- **Description:** Create a new task.
- **Body:** JSON object with `name` field.
- **Response:** Confirmation message.

### Update a Task

- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Description:** Update a task by its ID.
- **Body:** JSON object with `name` field.
- **Response:** Confirmation message.

### Delete a Task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.
- **Response:** Confirmation message.

## Using Bruno as the Client

- Bruno is used to send requests to the backend.
- In the absence of a database, data is stored in an in-memory array (`tasks`). However, this approach has a significant drawback: the data is stored temporarily, meaning that when the server is stopped and restarted, all tasks will be lost.
- When a database is set up, it is used to store the data persistently, ensuring data is retained even if the server is restarted.

## License

This project is licensed under the MIT License.
