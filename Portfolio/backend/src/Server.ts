import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running 🎉");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
