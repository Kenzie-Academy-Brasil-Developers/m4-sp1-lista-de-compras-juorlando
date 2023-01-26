import { request, Request, Response } from "express";
import { lista, ids } from "./database";
import { Client, ClienteRequiredKeys, ClientWorkOrder } from "./interface";

const validateData = (payload: any): Client => {
  const payLoadKeys: Array<string> = Object.keys(payload);
  const requiredKeys: Array<ClienteRequiredKeys> = ["listName", "data"];

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payLoadKeys.includes(key)
  );

  if (!hasRequiredKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required key are: ${joinedKeys}.`);
  }
  return payload;
};

const createClientList = (request: Request, response: Response): Response => {
  try {
    const orderData: Client | {} = validateData(request.body);

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
      ...orderData,
    };

    lista.push(newClientList);

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
  return response.json(lista);
};

const receiveOneList = (request: Request, response: Response): Response => {
  const indexList: number = request.workOrder.indexList;

  return response.json(lista[indexList]);
};

const deleteOneList = (request: Request, response: Response): Response => {
  const indexList: number = request.workOrder.indexList;

  lista.splice(indexList, 1);

  return response.status(204).send();
};

export { createClientList, receiveList, receiveOneList, deleteOneList };
