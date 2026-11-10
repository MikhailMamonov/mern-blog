import { Request } from "express";

// Расширяем глобальный интерфейс Express, чтобы добавить userId
declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

export type RequestWithAuthorization<P = any> = Request<P> & { userId: number };
export type RequestWithBody<T = any> = Request<{}, {}, T> & { userId: number };
