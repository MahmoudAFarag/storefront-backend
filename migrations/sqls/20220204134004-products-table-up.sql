/* Replace with your SQL commands */
CREATE TABLE products (
    id integer PRIMARY KEY generated always as identity,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(50) NOT NULL
);