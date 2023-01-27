import Todos from "../db/modals/todos";

const addTodo = async (req, res) => {
  try {
    Todos.findOneAndUpdate(
      { email: req.user },
      { $push: { todoList: req.body.content } },
      { upsert: true }
    ).catch((err) => {
      return res.status(500).send("Could not add task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

export default addTodo;
