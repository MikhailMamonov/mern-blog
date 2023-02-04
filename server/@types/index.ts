import { Request } from "express";

export type RequestWithAuthorization = Request & { userId: number };

// export type RequestWithBody<ResBody> = RequestWithAuthorization<
//   {},
//   {},
//   ResBody,
//   {}
// >;
