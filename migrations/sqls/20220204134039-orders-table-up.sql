/* Replace with your SQL commands */
CREATE TABLE orders (
    id integer PRIMARY KEY generated always as identity,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(10) DEFAULT 'active'
);