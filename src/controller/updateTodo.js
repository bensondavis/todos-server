import Todos from "../db/modals/todos";
import jwt from "jsonwebtoken";

const updateTodoItem = async (req, res) => {
  if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({
        message: "task failed",
      });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403);
  }

  try {
    await Todos.findOneAndUpdate(
      {
        email: req.body.email,
        "todoList.id": req.body.id,
      },
      {
        $set: {
          "todoList.$.todoItem": req.body.todoItem,
        },
      },
      { new: true }
    )
      .then((data) => {
        return res.status(200).send("updated successfully");
      })
      .catch((err) => {
        console.log({ err });
      });
  } catch (err) {
    console.log("catch err: " + err);
  }
};

const updateTodoCompleted = async (req, res) => {
  if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({
        message: "task failed",
      });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403);
  }

  try {
    await Todos.findOneAndUpdate(
      {
        email: req.body.email,
        "todoList.id": req.body.id,
      },
      {
        $set: {
          "todoList.$.completed": req.body.completed,
        },
      },
      { new: true }
    )
      .then((data) => {
        return res.status(200).send("updated successfully");
      })
      .catch((err) => {
        console.log({ err });
      });
  } catch (err) {
    console.log("catch err: " + err);
  }
};

const updateAllTodo = async (req, res) => {
  if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({
        message: "task failed",
      });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403);
  }

  try {
    const result = await Todos.updateMany({email: req.body.email}, {
      $set: {
        "todoList.$[].completed": req.body.completed,
      }
    })
    console.log({result});
  } catch(err) {
    console.log({err});
  }
}

export  {updateTodoItem, updateTodoCompleted, updateAllTodo};
