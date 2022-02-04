import "dotenv/config";
import express from "express";
import { productsRouter } from "./handlers/products";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Hello homepage");
});

productsRouter(app);

app.listen(3000, () => console.log(`Server started on port ${3000}`));
