import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
// };

const app = express();
app.use(cors()).use(express.json());
app.use(router);

async function connectDb() {
  try {
    mongoose.set('strictQuery', true);
    const dbUri = process.env.DATABASE_URL || 'sua_string_de_conexão_mongodb';
    await mongoose.connect(dbUri);
    console.log('Conexão com Mongo estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro de conexão com o Mongo:', error);
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('Desconectado do Mongo com sucesso.');
  } catch (error) {
    console.error('Erro ao desconectar do Mongo:', error);
  }
}

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
