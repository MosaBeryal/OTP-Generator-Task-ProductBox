const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
"otp_generator_task",
"root",
"root12345",

  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const databaseLoader = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.databaseLoader = databaseLoader;
module.exports = db;
