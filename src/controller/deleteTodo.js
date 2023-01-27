import Todos from "../db/modals/todos";

const deleteTodo = async (req, res) => {
  try {
    Todos.updateOne(
      { email: req.user },
      {
        $pull: {
          todoList: { id: req.body.id },
        },
      }
    ).catch((err) => {
      return res.status(500).send("Could not delete task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const deleteCompleted = (req, res) => {
  try {
    Todos.updateMany(
      { email: req.user },
      {
        $pull: {
          todoList: { completed: true },
        },
      }
    ).catch((err) => {
      return res.status(500).send("Could not delete tasks");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

export { deleteTodo, deleteCompleted };
