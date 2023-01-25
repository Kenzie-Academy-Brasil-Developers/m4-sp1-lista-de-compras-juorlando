import { Request, Response } from "express";
import { lista, ids } from "./database";
import { Client, ClienteRequiredKeys, Data } from "./interface";

const validateData = (payload: any): Client => {
  const payLoadKeys: string[] = Object.keys(payload);
  const requiredKeys: ClienteRequiredKeys[] = ["id", "listName", "data"];

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payLoadKeys.includes(key)
  );

  if (!hasRequiredKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required key are: ${joinedKeys}.`);
  }
  return payload;
};

const createClientList = (response: Response, request: Request): Response => {
  try {
    const validatedData: Client = validateData(request.body);

    const id: number = Math.floor(Math.random() * 1000);

    const idAlredExists = ids.find((element) => element === id);

    if (idAlredExists) {
      return response.status(409).json({
        message: "id exists, try again",
      });
    }

    const products: Data = {
      name: "Banana",
      quantity: "15",
    };

    const newClientList: Client = {
      id: id,
      listName: "Feira",
      data: products,
      ...lista,
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

export { createClientList, receiveList };
