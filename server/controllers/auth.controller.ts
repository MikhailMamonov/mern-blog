import { RequestWithAuthorization, RequestWithBody } from "../@types";
import { Response, Router } from "express";

import { AuthViewModel } from "../dtos/auth/AuthViewModel";
import Controller from "../interfaces/controller.interface";
import { InfoViewModel } from "../dtos/InfoViewModel";
import { User } from "../models/User";
import { UserLoginModel } from "../dtos/auth/UserLoginModel";
import { UserRegisterModel } from "../dtos/auth/UserRegisterModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController implements Controller {
  public path = "/comments";
  public router = Router();
  async register(
    req: RequestWithBody<UserRegisterModel>,
    res: Response<AuthViewModel | InfoViewModel>
  ) {
    try {
      const { username, password } = req.body;

      const isUsed = await User.findOne({ where: { username } });
      if (isUsed) {
        return res.json({ message: "Данное имя пользователя уже занято." });
      }

      const hash = await bcrypt.hash(password, 5);
      const user = await User.create({ username, password: hash });

      const token = generateJwtToken(user.id);

      return res.json({
        token,
        user: { id: user.id, username: user.username },
        message: "Регистрация прошла успешно.",
      });
    } catch (error) {
      return res.json({ message: "Ошибка при создании пользователя." });
    }
  }

  // Login
  async login(
    req: RequestWithBody<UserLoginModel>,
    res: Response<AuthViewModel | InfoViewModel>
  ) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({ message: "Логин или пароль некорректны." });
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.json({ message: "Пользователь не найден." });
      }
      const comparePassword = bcrypt.compareSync(password, user.password); // true
      if (!comparePassword) {
        return res.json({ message: "неверный пароль." });
      }

      const token = generateJwtToken(user.id);
      return res.json({ token, user, message: "Вы вошли в систему" });
    } catch (error) {
      return res.json({ message: (error as Error).message });
    }
  }

  //getMe
  async getMe(req: RequestWithAuthorization, res: Response) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.json({ message: "такого юзера не существует" });
      }
      const token = generateJwtToken(req.userId);
      return res.json({ user, token });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Нет доступа." });
    }
  }
}
const generateJwtToken = (id: number) => {
  return jwt.sign({ id: id }, process.env.SECRET_KEY!, {
    expiresIn: "24h",
  });
};

export default AuthController;
