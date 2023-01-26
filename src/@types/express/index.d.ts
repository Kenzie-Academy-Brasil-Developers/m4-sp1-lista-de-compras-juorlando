import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      workOrder: {
        indexList: number;
      };
    }
  }
}
