<a name="readme-top"></a>

## Intro to project
Tasks sharing App. The goal with the app is to make things easier for people live in the same
appartment when sharing tasks, expenses, etc. In the app there is a tasks list that is binded to each user. 

## Structure of the tables of the DB:
There are two tables in my DB.
1. Users table:
    - id
    - Name
    - Lastname
    - Description
2. Tasks table:
    - id
    - Description
    - isDone
    - Category
    - id_user

The two tables are joint by the users ID. 

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called mvp: `create database mvp`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=mvp
  DB_PASS=YOURPASSWORD
```

- In the project folder (amin) run `npm run migrate`. This will create a table called 'students' in your database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Development

- Run `npm start` in project directory to start the Express server.
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading.
