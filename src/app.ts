import express, { Application } from "express";
import { createClientList, receiveList, receiveOneList, deleteOneList, updateListInformation, deleteListIten } from "./logic";
import { ensureListExist, ensureItenExist, validateDataMiddleware, validateUpdateListMiddleware } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.get("/purchaseList", receiveList);
app.get("/purchaseList/:id", ensureListExist, receiveOneList);
app.post("/purchaseList", validateDataMiddleware, createClientList);
app.patch("/purchaseList/:id/:name", ensureListExist, ensureItenExist, validateUpdateListMiddleware, updateListInformation);
app.delete("/purchaseList/:id", ensureListExist, deleteOneList);
app.delete("/purchaseList/:id/:name", ensureListExist, ensureItenExist, deleteListIten);

app.listen(3000, () => {
  console.log("Server is running!");
});
