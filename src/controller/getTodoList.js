import Todos from "../db/modals/todos";

const getTodoList = async (req, res) => {
  try {
    Todos.findOne({ email: req.user })
      .then((data) => {
        if (data)
          return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(500).send("Could not get todo list");
      });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

export default getTodoList;
