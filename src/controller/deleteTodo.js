import Todos from "../db/modals/todos";
import jwt from "jsonwebtoken";

const deleteTodo = async (req, res) => {
  try {
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send("Not authorised");
        else {
          Todos.updateOne(
            { email: req.body.email },
            {
              $pull: {
                todoList: { id: req.body.id },
              },
            }
          )
            .then((data) => {
              console.log(data);
              if (data.modifiedCount !== 0) return res.sendStatus(201);
              else return res.sendStatus(304);
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).send("Could not add item");
            });
        }
      });
    } else {
      return res.sendStatus(403);
    }
  } catch (err) {
    console.log({ err });
  }
};

const deleteCompleted = (req, res) => {
  try {
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send("Not authorised");
        else {
          Todos.updateMany(
            { email: req.body.email },
            {
              $pull: {
                todoList: { completed: true },
              },
            }
          )
            .then((data) => {
              console.log(data);
              if (data.modifiedCount !== 0) return res.sendStatus(201);
              else return res.sendStatus(304);
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).send("Could not add item");
            });
        }
      });
    } else {
      return res.sendStatus(403);
    }
  } catch(err) {
    console.log({ err });
  }
} 

export  {deleteTodo, deleteCompleted};
