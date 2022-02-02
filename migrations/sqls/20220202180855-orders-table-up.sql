/* Replace with your SQL commands */
CREATE TABLE orders (
    id integer PRIMARY KEY generated always as identity,
    quantity integer NOT NULL,
    product_id integer REFERENCES products(id) ON DELETE CASCADE,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(10) DEFAULT 'active'
);