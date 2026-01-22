import mysql from 'mysql2/promise'

interface Config {
    port: number;
    host: string;
    user: string; 
    password: string;
    database: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST ?? "",
    user: process.env.DB_USER ?? "",
    password: process.env.PASSWORD ?? "",
    database: process.env.DATABASE ?? ""
};

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export { config, pool };
