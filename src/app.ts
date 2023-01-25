import express, { Application } from "express";
import { createClientList, receiveList } from "./logic";

const app: Application = express();
app.use(express.json());

app.get("/purchaseList", receiveList);
app.post("/purchaseList", createClientList);

app.listen(3000, () => {
  console.log("Server is running!");
});
