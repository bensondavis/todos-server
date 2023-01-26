import { model, Schema } from "mongoose";

const todosSchema = new Schema({
  email: { type: String, trim: true , required: true},
  todoList: [
    {
      id: {type: String, required: true},
      todoItem: String,
      completed: Boolean,
      updated: { type: Date, default: Date.now },
    },
  ],
});

const Todos = model("Todos", todosSchema);

export default Todos;