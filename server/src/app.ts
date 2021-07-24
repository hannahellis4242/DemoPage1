import express, { Request, Response, NextFunction } from "express";
import path from "path";
import router from "./routes/contacts";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../app.html"));
});

app.get("/scripts/app.js", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../scripts/app.js"));
});

app.get("/style/app.css", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../style/app.css"));
});

app.use("/addresses", router);

app.get("*", (req: Request, res: Response) => {
  console.log("request : " + req.url);
  res.sendStatus(200);
});
app.listen(3000);
