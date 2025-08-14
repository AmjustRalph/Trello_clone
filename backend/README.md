# Backend folder

# Trello_Clone_Backend

A RESTful API backend for a Trello-like project management application.
Built with Node.js, Express, Typescript and Prisma.
This API allows users to manage Boards, Lists, and Tasks with full CRUD operations and authentication.

================================================================================

Features:
  - User registration and authentication (JWT-based)
  - Create, Read, Update, Delete Boards, Lists, and Tasks


================================================================================

Tech_Stack:
  - Node.js           : JavaScript runtime
  - Express           : Web framework for REST APIs
  - Prisma            : ORM for database interaction
  - PostgreSQL        : Relational database
  - JWT               : JSON Web Tokens for authentication
  - dotenv            : Environment variable management
  - cors              : Cross-Origin Resource Sharing
- Typescript          : Type safety
================================================================================

Getting_Started:

  Prerequisites:
    - Node.js >= 18
    - PostgreSQL database
    - npm or yarn

  Installation:
    1. Clone the repository:
      git clone 
    2. Navigate to the project:
       cd trello-clone-backend
    3. Install dependencies:
       npm install
    4. Start the development server:
       npm run dev

================================================================================

API_Endpoints:

  Auth:
    - POST   /api/auth/register   : Register a new user
    - POST   /api/auth/login      : Login and receive JWT

  Boards:
    - GET    /api/boards          : Get all boards for authenticated user
    - POST   /api/boards          : Create a new board
    - PUT    /api/boards/:id      : Update a board
    - DELETE /api/boards/:id      : Delete a board

  Lists:
    - GET    /api/lists/:boardId  : Get all lists in a board
    - POST   /api/lists           : Create a new list in a board
    - PUT    /api/lists/:id       : Update a list
    - DELETE /api/lists/:id       : Delete a list

  Tasks:
    - GET    /api/tasks/:listId   : Get all tasks in a list
    - POST   /api/tasks           : Create a new task
    - PUT    /api/tasks/:id       : Update a task
    - DELETE /api/tasks/:id       : Delete a task

================================================================================

Authentication:
  - JWT-based authentication
 

================================================================================

Database:
  - Uses Prisma to interact with PostgreSQL
  - Run migrations:
      npx prisma migrate dev
  - Use Prisma Studio to inspect the database:
      npx prisma studio

================================================================================

Contributing:
  1. Fork the repository
  2. Create a new branch:
       git checkout -b feature-name
  3. Commit your changes:
       git commit -m "Add some feature"
  4. Push to the branch:
       git push origin feature-name
  5. Open a pull request

================================================================================

License:
  MIT License © Nanor Bright Suka && Tetteh Raphael
