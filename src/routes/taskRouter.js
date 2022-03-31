import express from "express";
import {
  addTask,
  listTasks,
  updateTask,
  deleteTask,
  deleteAllTasks,  
} from "../controllers/toDoController";
import {checkJwt} from "../middlewares/checkJWT";
import { taskValidation } from "../middlewares/validations/formValidation";
import { validate } from "../middlewares/validations";

const router = express.Router();

router.post('/add',checkJwt,[taskValidation, validate], addTask);

router.get('/list',checkJwt, listTasks);

router.put('/update/:id',checkJwt,[taskValidation, validate], updateTask);

router.delete('/delete/:id',checkJwt, deleteTask);

router.delete('/delete',checkJwt, deleteAllTasks)

router.get(`/list?title=title`,checkJwt, listTasks)

router.get(`/list?responsible=responsible`,checkJwt, listTasks)



export default router;
