# MyBlog Server

Welcome to MyBlog Server, the backend / REST API for the MyBlog application built with **expressjs**.

## Features

- MyBlog server is a REST API which provides endpoints for managing articles, comments, and user profiles.
- It has database integration, it stores article, comment, and user profile data securely.
- It allows users to securely sign in and manage their accounts.

## Technologies used

- Nodejs
- Expressjs
- Mongodb

## Libraries used

- bcrypt : for hashing passwords
- cors : to enable cors
- jsonwebtoken : to generate and manage JWT tokens
- mongoose : Mongodb object modeling tool
- slugify : to slugify a url params

## Getting started

1. Clone this repo.
2. Navigate to project directory.
3. Install dependencies using `npm install`.
4. Set up a mongodb database and configure the connection.
5. Start the server with `npm start`.
6. The server will be running on the specified port, ready to handle requests from the MyBlog client.

Feel free to explore the codebase and contribute to make MyBlog even better!
