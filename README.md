# Airbean API Documentation

This Airbean API was created for learning purposes using different "often used" technologies for example:

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT Token
- bcrypt

## The application is divided by

- Routes
- Controllers
- Models
- Middleware
- Utils

### Start Application

**Install dependencies using npm :**

`npm install`

**Create .env file in root folder with following variables :**

- `NODE_ENV`=development
- `PORT`
- `DATABASE_CONNECTION`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_SERVER`
- `SECRET`=JWTSECRET
- `JWTEXPIRATION`

**_Example :_**

Mongodb connection URI:
`${DATABASE_CONNECTION}${DATABASE_USER}:${DATABASE_PASSWORD}${DATABASE_SERVER}`

### Available scripts in `package.json`

#### \_Start server using nodemon as filewatcher

`nodemon server.js`

#### _Start server without filewatcher (with node command)_

`node server.js`

## Api Routes

### Open Routes

- GET Menu - /api/menu/

- POST Order as Guest - /api/guest/order

  - Body:
    {
    "details": {
    "order": [
    {
    "name": "Bryggkaffe",
    "price": 29
    },
    {
    "name": "Kaffe Latte",
    "price": 54
    }
    ]
    }
    }

- GET Order status Guest - /api/guest/order/status/:id

- POST Sign up - /api/user/auth/signup

  - Body:
    {
    "username": "username",
    "email": "user@gmail.com",
    "password": "password",
    "roles": ["user", "admin"]
    }

- POST Sign in - /api/user/auth/signin

  - Body:
    {
    "username": "username",
    "password": "password"
    }

    - Returns secretToken

  ## User Routes

  #### Include Header Authorization Bearer Token in following routes!

- POST Order as Signed in - /api/user/auth/order

  - Body:
    {
    "details": {
    "order": [
    {
    "name": "Bryggkaffe",
    "price": 29
    },
    {
    "name": "Kaffe Latte",
    "price": 54
    }
    ]
    }
    }

- GET Order history - /api/user/auth/orderhistory

- GET Orderstatus - /api/user/auth/:id

  ## Admin Routes

  #### Include Header Authorization Bearer Token in following routes!

- GET All orders - /api/admin/auth/allorders

  - Paging - ?limit=2&page=2
  - Sorting - ?sort=-userId
  - Fields - ?fields=userId

- GET Menu - /api/admin/auth/menu \*Will be deleted.

- POST Add product to menu - /api/admin/auth/menu

  - Body:
    {
    "title": "Espresso",
    "desc": "En enkel espresso.",
    "price": 43
    }

- PATCH Patch Product - /api/admin/auth/menu/:id

  - Body:
    {
    "title": "En Fluffig Semla"
    }

- DELETE Delete product from menu - /api/admin/auth/menu/:id
