require("dotenv").config();
const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
//   new Sequelize(
//   process.env.DB_NAME, //Имя бд
//   process.env.DB_USER, //Имя пользователя
//   process.env.DB_PASSWORD, //Пароль
//   { dialect: "postgres", host: process.env.DB_HOST, port: process.env.DB_PORT }
// );
module.exports = sequelize;
