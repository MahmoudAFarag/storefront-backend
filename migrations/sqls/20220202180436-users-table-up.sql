/* Replace with your SQL commands */
CREATE TABLE users (
    id integer PRIMARY KEY generated always as identity,
    first_name VARCHAR(50) NOT NUll,
    last_name VARCHAR(50) NOT NULL,
    password text NOT NULL
);