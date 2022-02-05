import "dotenv/config";
import express from "express";
import { ordersRouter } from "./handlers/orders";
import { productsRouter } from "./handlers/products";
import { usersRouter } from "./handlers/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Hello homepage");
});

productsRouter(app);
usersRouter(app);
ordersRouter(app);

app.listen(3000, () => console.log(`Server started on port ${3000}`));
