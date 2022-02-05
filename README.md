# E-Commerce Backend API

A backend API built using express and typescript that can bootstrap an e-commerce app.

---

## Installation

---

1. Clone the repository locally

```
git clone https://github.com/MahmoudAshraf25/udacity-ecommerce.git

cd udacity-ecommerce
```

2. Install node dependencies

```
npm install
```

3. Create a .env file and set the following variables (ONLY FOR DEVELOPMENT)

```
POSTGRES_HOST=localhost
POSTGRES_DB=ecommerce_db
POSTGRES_DB_TEST=ecommerce_db_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345
BCRYPT_PASSWORD=easypass
SALT_ROUNDS=10
TOKEN_SECRET=05df9944691536e6f580a0aa9a20760dad4317c46414c9badc74085f54312626bfd12a9d22b24b8e4e0ca77fecb33c8d1b75c71d86fd7bebf832e5d8faec9118
```

4. Run a postgres database using docker

```
docker-compose -f docker-compose.yml up // Compose V1

docker compose -f docker-compose.yml up // Compose V2
```

5. Create new database using psql

```
// Using docker:

$ docker exec -it ecommerce_db bash
$ psql -U postgres
$ CREATE DATABASE ecommerce_db;
$ CREATE DATABASE ecommerce_db_test;

// Locally:

$ psql -U postgres
$ CREATE DATABASE ecommerce_db;
$ CREATE DATABASE ecommerce_db_test;
```

6. Run migrations

```
npm run migrate
```

7. Run development server

```
npm run dev // Runs the server on port 3000
```

OR run the production server

```
npm run build
npm run start
```

---

## Database Schema

---

```
#### Product

- id
- name
- price
- category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
```

---

## Routes Reference

---

- All routes exist in requests.rest file. You can use it directly by installing the following VsCode extension: [Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Or you can use a third-party tool like Postman

### 1. Products Routes

```
// GET ALL PRODUCTS

GET http://localhost:3000/products

// GET SINGLE PRODUCT

GET http://localhost:3000/products/1

// CREATE NEW PRODUCT

POST http://localhost:3000/products
Authorization: Bearer [TOKEN] // get token by creating a user
Content-Type: application/json

{
    "name": "Sofsa",
    "price": 1500,
    "category": "Living Room"
}

// GET PRODUCT BY CATEGORY

GET http://localhost:3000/products/category/Living%20Room
```

### 2. Users Routes

```
// GET ALL USERS

GET http://localhost:3000/users
Authorization: Bearer [TOKEN] // get token by creating a user

// GET SINGLE USER

GET http://localhost:3000/users/2
Authorization: Bearer [TOKEN] // get token by creating a user

// CREATE NEW USER

POST http://localhost:3000/users
Content-Type: application/json

{
    "first_name": "David",
    "last_name": "Lawrence",
    "password": "secret"
}

// CREATE NEW USER 2

POST http://localhost:3000/users
Content-Type: application/json

{
    "first_name": "Helen",
    "last_name": "Pierce",
    "password": "nothere"
}

// AUTHENTICATE USER

POST http://localhost:3000/users/auth
Content-Type: application/json

{
    "first_name": "David",
    "last_name": "Lawrence",
    "password": "secret"
}
```

### 3. Orders Routes

```
// GET ORDER BY USER

GET http://localhost:3000/orders/1
Authorization: Bearer [TOKEN] // get token by creating a user

// GET COMPLETED BY USER

GET http://localhost:3000/orders/completed/3
Authorization: Bearer [TOKEN] // get token by creating a user
```
