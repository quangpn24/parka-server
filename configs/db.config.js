if (process.env.NODE_ENV !== "production") require("dotenv").config();

module.exports = {
  development: {
    username: "jxaseoztgycmpw",
    password:
      "2715a892fb7ebe9475613ebfd6ca481b098af3e9a9d3b1ba2f7fc2d81a4caafd",
    database: "d40aqt5h4f3c7b",
    host: "ec2-52-5-1-20.compute-1.amazonaws.com",
    dialect: "postgres",
    port: process.env.PG_PORT,
    operatorsAliases: 0,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: "postgres",
    port: process.env.PG_PORT,
    operatorsAliases: 0,
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION
      },
    },
  },
};
