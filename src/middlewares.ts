import { NextFunction, Request, Response } from "express";
import { database, list } from "./database";

const validateDataMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const payLoadKeys: Array<string> = Object.keys(request.body);
  const keyValue: Array<any> = Object.values(request.body);
  const requiredKeys: Array<string> = ["listName", "data"];

  const hasRequiredKeys: boolean = payLoadKeys.every((key: string) => {
    return requiredKeys.includes(key);
  });

  const typeKey: boolean = keyValue.every((key: any) => {
    if (typeof key !== "string") {
      return response
        .status(400)
        .json({ message: "tipo do valor de entrada inválido" });
    }
  });

  if (!hasRequiredKeys) {
    return response.status(400).json({ message: "entrada inválida" });
  }

  const { listName, data } = request.body;

  request.validatedBody = {
    listName,
    data,
  };

  return next();
};

const validateUpdateListMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const payLoadKeys: Array<string> = Object.keys(request.body);
  const keyValue: Array<any> = Object.values(request.body);
  const requiredKeyProduct: Array<string> = ["name", "quantity"];

  let hasRequiredKeysProducts: boolean = payLoadKeys.every((key) =>
    requiredKeyProduct.includes(key)
  );

  const typeKey: boolean = keyValue.every((key: any) => {
    if (typeof key !== "string") {
      return response
        .status(400)
        .json({ message: "tipo do valor de entrada inválido" });
    }
  });

  if (!hasRequiredKeysProducts || typeKey === true) {
    return response.status(400).json({ message: "entrada inválida" });
  }

  const { name, quantity } = request.body;

  request.validatedData = {
    name,
    quantity,
  };

  return next();
};

const ensureListExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = parseInt(request.params.id);

  const findList = list.findIndex((element) => element.id === id);

  if (findList === -1) {
    return response.status(404).json({
      message: "Lista não encontrada",
    });
  }

  request.indexList = findList;

  return next();
};

const ensureItenExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const name: string = request.params.name;

  const findIten = list.map((element) => database.push(...element.data));

  const findIndexName = database.findIndex((element) => element.name === name);

  if (findIndexName === -1) {
    return response.status(404).json({
      message: "item não encontrado na lista",
    });
  }

  request.indexIten = findIndexName;

  return next();
};

export {
  ensureListExist,
  ensureItenExist,
  validateDataMiddleware,
  validateUpdateListMiddleware,
};
