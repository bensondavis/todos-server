import Todos from "../db/modals/todos";
import jwt from "jsonwebtoken";

const addTodo = async (req, res) => {
  // if (req.headers["authorization"])
  try {
    if (req.headers["authorization"]) {
      const authHeader = req?.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send("Unauthorised");
        else {
          Todos.findOneAndUpdate(
            { email: req.body.email },
            { $push: { todoList: req.body.content } },
            { upsert: true, returnDocument: "after" }
          )
            .then((data) => {
              console.log(data);
              if (data) {
                return res.sendStatus(201);
              }
            })
            .catch((err) => {
              console.log({ err });
              return res.status(500).send("Could not add item");
            });
        }
      });
    } else {
      return res.sendStatus(403);
    }

    // Todos.findOneAndUpdate(
    //   { email: req.body.email },
    //   { $push: { todoList: req.body.content } },
    //   { upsert: true, returnDocument: "after" }
    // )
    //   .then((data) => {
    //     console.log(data);
    //     if (data) {
    //       return res.sendStatus(201);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //     return res.status(500).send("Could not add item");
    //   });
  } catch (err) {
    console.log("catch err: " + err);
    return res.status(500).send("Internal Server Error");
  }
};

export default addTodo;
