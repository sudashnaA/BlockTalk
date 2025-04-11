import express from 'express';
import usersRouter from './routes/users';
import boardsRouter from "./routes/boards";
import postsRouter from "./routes/posts";
import cors from 'cors';
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface User {
      id: number;
    }
    interface Request {
      boardid?: number
      postid?: number
   }
  }
}

require('./lib/passport');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: "*",
}));

const PORT = 3000;

app.use("/api/users", usersRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/boards/:name/posts/", postsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});