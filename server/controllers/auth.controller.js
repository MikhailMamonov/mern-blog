const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

// Register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ where: { username } });
    if (isUsed) {
      return res.json({ message: "Данное имя пользователя уже занято." });
    }

    const hash = await bcrypt.hash(password, 5);
    const user = await User.create({ username, password: hash });

    const token = generateJwtToken(user.id, user.username);

    return res.json({ token, user, message: "Регистрация прошла успешно." });
  } catch (error) {
    return res.json({ message: "Ошибка при создании пользователя." });
  }
};

// Login
exports.login = async (req, res) => {
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

    const token = generateJwtToken(user.id, user.username);
    return res.json({ token, user, message: "Вы вошли в систему" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

//getMe
exports.getMe = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.json({ message: "такого юзера не существует" });
    }

    const token = generateJwtToken(req.user.id, req.user.username);
    return res.json({ user, token });
  } catch (error) {
    return res.json({ message: "Нет доступа." });
  }
};

const generateJwtToken = (id, username) => {
  return jwt.sign({ id: id, username }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};