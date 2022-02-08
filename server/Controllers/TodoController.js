/** @format */

const mongoose = require("mongoose");
const { TodoSchemaValidation } = require("../Helper/TodoSchemaValidation");
const Todo = require("../Models/TodoSchema");

class TodoController {
  constructor() {
    console.log("TodoController init !!!");
  }

  createTodo(req, res) {
    const validate = TodoSchemaValidation.validate(req.body);
    if (validate.error) {
      return res.status(422).json(validate.error);
    } else {
      const { title, description } = req.body;
      const newTodo = Todo({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        description: description,
      });
      newTodo
        .save()
        .then((result) => {
          res.status(201).json({ msg: "New Task save" });
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    }
  }

  getAllPosts(req, res) {
    Todo.find({}, (err, todos) => {
      if (err) {
        return res.status({ msg: err.message });
      } else {
        if (!todos) {
          return res.status(200).json({ msg: "Empty list" });
        } else {
          res.status(200).json(todos);
        }
      }
    });
  }

  getSinglePost(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: "Id is not present" });
    } else {
      Todo.findById(req.params.id, (err, todo) => {
        if (err) {
          return res.status(400).json({ msg: err.message });
        } else {
          if (!todo) {
            return res.status(400).json({ msg: "Invalid ID" });
          } else {
            res.status(200).json(todo);
          }
        }
      });
    }
  }

  updateTodo(req, res) {
    const { updateDes } = req.body;
    Todo.findByIdAndUpdate(req.params.id, { $set: { description: updateDes } })
      .then((result) => {
        res.status(200).json({ msg: "Updated successfully" });
      })
      .catch((err) => {
        return res.status(400).json({ msg: err.message });
      });
  }

  deletePost(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: "Url param is not present" });
    } else {
      Todo.findById(req.params.id, (err, todo) => {
        if (err) {
          return res.status(400).json({ msg: err.message });
        } else {
          if (!todo) {
            return res.status(400).json({ msg: "Task has been deleted" });
          } else {
            Todo.findByIdAndRemove(req.params.id, (err, result) => {
              if (err) {
                return res.status(400).json({ msg: err.message });
              } else {
                res.status(200).json({ msg: "Successfully deleted" });
              }
            });
          }
        }
      });
    }
  }
}

module.exports = new TodoController();
