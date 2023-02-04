import App from "./app";
import AuthenticationController from "./controllers/auth.controller";
import CommentController from "./controllers/comments.controller";
import { PostController } from "./controllers/posts.controller";
import dotenv from "dotenv";

dotenv.config();

const app = new App([
  new PostController(),
  new AuthenticationController(),
  new CommentController(),
]);

app.listen();
