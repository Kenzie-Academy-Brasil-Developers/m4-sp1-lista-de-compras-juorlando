import * as express from "express";
import { Data } from "../../interface";

declare global {
  namespace Express {
    interface Request {
      validatedBody: {
        listName: string,
        data: validatedData[],
      };
      validatedData: {
        name: string,
        quantity: string,
      }
      indexList: number;
      indexIten: number;
    }
  }
}
