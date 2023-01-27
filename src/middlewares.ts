import { NextFunction, Request, Response } from "express";
import { database, list } from "./database";
import { ClienteRequiredKeys, DataRequiredKeys } from "./interface";

const validateDataMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const payLoadKeys: Array<string> = Object.keys(request.body);
  const requiredKeys: Array<ClienteRequiredKeys> = ["listName", "data"];

  let hasRequiredKeys: boolean = requiredKeys.every((key) =>
    payLoadKeys.includes(key)
  );

  if (!hasRequiredKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required key are: ${joinedKeys}.`);
  }

  const { listName, data: [{name, quantity}] } = request.body;

  request.validatedBody = {
    listName,
    data: [{
      name,
      quantity
    }]
  };

  return next();
};

const validateUpdateListMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  console.log(request.body);
  const payLoadKeys: Array<string> = Object.keys(request.body);
  const requiredKeyProduct: Array<DataRequiredKeys> = ["name", "quantity"];

  let hasRequiredKeysProducts: boolean = requiredKeyProduct.every((key) =>
    payLoadKeys.includes(key)
  );

  // if(request.method === "PATCH"){
  //   hasRequiredKeysProducts = requiredKeyProduct.some((key: string) => payLoadKeys.includes(key)) 
  //   request.body = {...list[request.indexList], ...request.body}
  // }

  if (!hasRequiredKeysProducts) {
    const joinedKeys: string = requiredKeyProduct.join(", ");
    throw new Error(`Required key are: ${joinedKeys}.`);
  }

  const { name, quantity } = request.body;

  request.validatedBody.data = [
    {
      name,
      quantity,
    },
  ];

  return next();
};

const ensureListExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = parseInt(request.params.id);
  const name: string = request.params.name;

  const findList = list.findIndex((element) => element.id === id);

  const findIten = list.map((element) => database.push(...element.data))

  const findName = database.find((element) => element.name === name)

  if (findList === -1) {
    return response.status(404).json({
      message: "Lista não encontrada",
    });
  }
  
  request.indexList = findList;

  return next();
};

export { ensureListExist, validateDataMiddleware, validateUpdateListMiddleware };
