# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products:

---

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

### Users:

---

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

#### Orders

```
// CREATE NEW ORDER

POST http://localhost:3000/orders
Content-Type: application/json
Authorization: Bearer [TOKEN] // get token by creating a user

{
    "user_id": 1,
    "status": "complete"
}

// GET ORDER BY USER

GET http://localhost:3000/orders/1
Authorization: Bearer [TOKEN] // get token by creating a user

// GET COMPLETED BY USER

GET http://localhost:3000/orders/completed/3
Authorization: Bearer [TOKEN] // get token by creating a user
```

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- user_id
- status of order (active or complete)

#### Order Products

- id
- quantity
- user_id
- product_id

## Data tables Schema

### Orders

    id integer PRIMARY KEY generated always as identity,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(10) DEFAULT 'active'

### Products

    id integer PRIMARY KEY generated always as identity,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(50) NOT NULL

### Users

    id integer PRIMARY KEY generated always as identity,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL

### Order_Products

    id INTEGER PRIMARY KEY generated always as identity,
    quantity INTEGER NOT NULL,
    product_id bigint REFERENCES products(id) ON DELETE CASCADE,
    user_id bigint REFERENCES users(id) ON DELETE CASCADE
