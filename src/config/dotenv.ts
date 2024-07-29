import dotenv from "dotenv"
dotenv.config();

export default {
    DB_HOST : process.env.DB_HOST || "localhost",
    DB_USER  : process.env.DB_USER || "root",
    DB_PASSWORD : process.env.DB_PASSWORD || "1234",
    DB_NAME : process.env.DB_NAME || "blogdb",
    PORT : process.env.PORT || "3000"
};