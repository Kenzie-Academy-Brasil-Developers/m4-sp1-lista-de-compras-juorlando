import express, { Application } from "express";
import { createClientList, receiveList, receiveOneList, deleteOneList } from "./logic";
import { ensureListExist } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.get("/purchaseList", receiveList);
app.get("/purchaseList/:id", ensureListExist, receiveOneList);
app.post("/purchaseList", createClientList);
app.delete("/purchaseList/:id", ensureListExist, deleteOneList);

app.listen(3000, () => {
  console.log("Server is running!");
});
