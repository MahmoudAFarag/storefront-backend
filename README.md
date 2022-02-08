# E-Commerce Backend API

A backend API built using express and typescript that can bootstrap an e-commerce app.

---

## Ports and Hosts

- Server : **3000**
- Database : **5432**

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
ENV=dev
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

## Routes Reference

---

- All routes exist in requests.rest file and Requirements.md file. You can use it directly by installing the following VsCode extension: [Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Or you can use a third-party tool like Postman

---

## Testing

---

To run tests, run the following command:

```
npm run test
```

This will change the environment to "test" and run the tests according to each handler on the testing database
