# Artisans API

Artisans API is a backend service designed to support a tradesperson platform where users can find skilled tradespeople for various tasks. The platform includes features for user and tradesperson management, task posting, and a review system to ensure quality and trust. This project is currently a **work in progress** and actively under development.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Artisans API acts as the backbone for a tradesperson application. It facilitates connections between users and tradespeople, provides endpoints for posting and managing tasks, and enables reviews to help users make informed decisions. Built for scalability and reliability, this API is a key component of the tradesperson platform.

---

## Features

- **User and Tradesperson Management**: Handle registration, authentication, and profile management.
- **Task Posting and Management**: Users can post tasks and receive responses from tradespeople.
- **Review System**: Built-in rating and review functionality for completed jobs.
- **Database Integration**: Supports relational database systems like MySQL.
- **Extensible Architecture**: Designed for easy feature addition and scalability.

---

## Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** (version 16.x or later)
- **NPM** (version 8.x or later)
- **MySQL** (version 8.x or later) or a compatible database

---
1. Clone the Repository:

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
