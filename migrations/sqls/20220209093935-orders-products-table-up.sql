/* Replace with your SQL commands */
CREATE TABLE order_products (
    id INTEGER PRIMARY KEY generated always as identity,
    quantity INTEGER NOT NULL,
    product_id bigint REFERENCES products(id) ON DELETE CASCADE,
    user_id bigint REFERENCES users(id) ON DELETE CASCADE
);