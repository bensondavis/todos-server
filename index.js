import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { init } from "./src/db/init";
import addTodo from "./src/controller/addTodo";
import login from "./src/controller/login";
import signup from "./src/controller/SignUp";
import getTodoList from "./src/controller/getTodoList";
import {
  updateTodoItem,
  updateTodoCompleted,
  updateAllTodo,
} from "./src/controller/updateTodo";
import { deleteTodo, deleteCompleted } from "./src/controller/deleteTodo";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT;

init().catch((e) => console.log(e.message));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add-todo", addTodo);

app.post("/signup", signup);

app.post("/login", login);

app.post("/get-todo-list", getTodoList);

app.post("/update-todo-item", updateTodoItem);

app.post("/update-todo-completed", updateTodoCompleted);

app.post("/delete-todo", deleteTodo);

app.post("/update-all-todo", updateAllTodo);

app.post("/delete-completed", deleteCompleted);

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
