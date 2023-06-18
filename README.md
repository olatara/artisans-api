# artisans-api

npx knex migrate:make migration_name

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Prerequisites

Before running this project, ensure that you have the following installed:

- Node.js (version X.X.X)
- NPM (version X.X.X)
- MySQL (version X.X.X) or any other compatible database system

## Installation

1. Clone the repository:

   `git clone <repository-url>`

2. Change into the project directory:

   `cd project-directory`

3. Install the dependencies:
  
  `npm install`

4. Run database migrations:

  `npx knex migrate:latest`

## Configuration

1. Create a .env file in the project's root directory.
2. Define the necessary environment variables in the .env file. For Example:

```
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your-database-password
```

## Usage

To start the application in development mode with automatic restarts on file changes, run the following command:

`npm start`