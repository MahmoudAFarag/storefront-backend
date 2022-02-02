import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Hello homepage");
});

app.listen(3000, () => console.log(`Server started on port ${3000}`));
