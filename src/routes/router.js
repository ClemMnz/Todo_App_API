import express from "express";
import {
  addTask,
  listTasks,
  updateTask,
  deleteTask,
  deleteAllTasks, 
  getTaskById,
  findByTitle
} from "../controllers/toDoController";
import {checkJwt} from "../middlewares/checkJWT";

const router = express.Router();

router.post('/add-todo',checkJwt, addTask);

router.get('/get-todo/:id', getTaskById);

router.get('/todos-list',checkJwt, listTasks);

router.put('/update-todo/:id',checkJwt, updateTask);

router.delete('/delete-todo/:id',checkJwt, deleteTask);

router.delete('/delete-todos',checkJwt, deleteAllTasks)

router.get(`/todos-list?title=title`, findByTitle)


export default router;
