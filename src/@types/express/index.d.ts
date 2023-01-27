import * as express from "express";
import { Data } from "../../interface";

declare global {
  namespace Express {
    interface Request {
      validatedBody: {
        listName: string,
        data: 
        [{
          name: string,
          quantity: string,
        }];
      };
      indexList: number;
    }
  }
}
