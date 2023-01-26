import Todos from "../db/modals/todos";
import jwt from "jsonwebtoken";

const getTodoList = async (req, res) => {
  try {
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send("Not authorised");
        else {
          Todos.findOne({ email: req.body.email })
            .then((data) => {
              if (data) {
                return res.status(200).send(data);
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).send("Could not get list");
            });
        }
      });
    } else {
      return res.sendStatus(403);
    }

    //  await Todos.findOne({email: req.body.email}).then((data)=> {
    //   return res.status(200).send(data);
    // }).catch((err)=> {
    //   console.log(err);
    // })
  } catch (err) {
    console.log("catch err: " + err);
  }
};

export default getTodoList;
