import Todos from "../db/modals/todos";

const updateTodoItem = async (req, res) => {
  try {
    Todos.findOneAndUpdate(
      {
        email: req.user+1,
        "todoList.id": req.body.id,
      },
      {
        $set: {
          "todoList.$.todoItem": req.body.todoItem,
        },
      }
    ).catch((err) => {
      return res.status(500).send("Could not update task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateTodoCompleted = async (req, res) => {
  try {
    Todos.findOneAndUpdate(
      {
        email: req.user,
        "todoList.id": req.body.id,
      },
      {
        $set: {
          "todoList.$.completed": req.body.completed,
        },
      }
    ).catch((err) => {
      return res.status(500).send("Could not update task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateAllTodo = async (req, res) => {
  try {
    Todos.updateMany(
      { email: req.user },
      {
        $set: {
          "todoList.$[].completed": req.body.completed,
        },
      }
    ).catch((err) => {
      return res.status(500).send("Could not update task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

export { updateTodoItem, updateTodoCompleted, updateAllTodo };
