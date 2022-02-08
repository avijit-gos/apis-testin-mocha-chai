/** @format */

const router = require("express").Router();
const TodoController = require("../Controllers/TodoController");

router.post("/post", TodoController.createTodo);
router.get("/get_all_todos", TodoController.getAllPosts);
router.get("/get_todo/:id", TodoController.getAllPosts);
router.patch("/update/:id", TodoController.updateTodo);
router.delete("/delete/:id", TodoController.deletePost);

module.exports = router;
