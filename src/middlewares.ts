import { NextFunction, Request, Response } from "express";
import { lista } from "./database";

const ensureListExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = parseInt(request.params.id);

  const indexList = lista.findIndex((element) => element.id === id);

  if (indexList === -1) {
    return response.status(404).json({
      message: "Lista não encontrada",
    });
  }
  request.workOrder = {
    indexList: indexList,
  };
  return next();
};

export { ensureListExist };
