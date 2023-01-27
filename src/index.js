import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { init } from "./db/init";
import addTodo from "./controller/addTodo";
import login from "./controller/login";
import signup from "./controller/signup";
import getTodoList from "./controller/getTodoList";
import {
  updateTodoItem,
  updateTodoCompleted,
  updateAllTodo,
} from "./controller/updateTodo";
import { deleteTodo, deleteCompleted } from "./controller/deleteTodo";
import AuthenticateToken from "./functions/AuthenticateToken";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT;

init().catch((e) => console.log(e.message));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add-todo", AuthenticateToken, addTodo);

app.post("/signup", signup);

app.post("/login", login);

app.post("/get-todo-list", AuthenticateToken, getTodoList);

app.post("/update-todo-item", AuthenticateToken, updateTodoItem);

app.post("/update-todo-completed", AuthenticateToken, updateTodoCompleted);

app.post("/delete-todo", AuthenticateToken, deleteTodo);

app.post("/update-all-todo", AuthenticateToken, updateAllTodo);

app.post("/delete-completed", AuthenticateToken, deleteCompleted);

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
