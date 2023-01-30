import { request, Request, Response } from "express";
import { list, ids } from "./database";
import { ClientWorkOrder } from "./interface";

const createClientList = (
  { validatedBody }: Request,
  response: Response
): Response => {
  try {
    let id: number = 0;

    const generateID = (() => ((id = 0), () => ids.push(id++)))();

    const idAlredExists = ids.find((element) => element === id);

    if (idAlredExists) {
      return response.status(409).json({
        message: "id exists, try again",
      });
    }

    const newClientList: ClientWorkOrder = {
      id: generateID(),
      ...validatedBody,
    };

    list.push(newClientList);

    return response.status(201).json(newClientList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }
    console.log(error);
    return response.status(500).json({ message: "Internal Server Error!" });
  }
};

const receiveList = (request: Request, response: Response): Response => {
  return response.status(200).json(list);
};

const receiveOneList = (request: Request, response: Response): Response => {
  const indexList: number = request.indexList;

  return response.json(list[indexList]);
};

const deleteOneList = (request: Request, response: Response): Response => {
  const indexList: number = request.indexList;

  list.splice(indexList, 1);

  return response.status(204).send();
};

const deleteListIten = (request: Request, response: Response): Response => {
  list[request.indexList].data.splice(request.indexIten, 1);

  return response.status(204).send();
};

const updateListInformation = (
  { validatedData, indexList, indexIten }: Request,
  response: Response
): Response => {
  list[indexList].data[indexIten] = {
    ...list[indexList].data[indexIten],
    ...validatedData,
  };

  return response.status(200).json(list[indexList].data[indexIten]);
};

export {
  createClientList,
  receiveList,
  receiveOneList,
  deleteOneList,
  updateListInformation,
  deleteListIten,
};
