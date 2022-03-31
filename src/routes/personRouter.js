import express from "express";
import {
  addPerson,
  listPersons,
  updatePerson,
  deletePerson,
  deleteAllPersons 
} from "../controllers/personController";
import {checkJwt} from "../middlewares/checkJWT";
import { personValidation } from "../middlewares/validations/formValidation";
import { validate } from "../middlewares/validations/index";

const router = express.Router();

router.post('/add',checkJwt,[personValidation, validate], addPerson);

router.get('/list',checkJwt, listPersons);

router.put('/update/:id',checkJwt,[personValidation, validate], updatePerson);

router.delete('/delete/:id',checkJwt, deletePerson);

router.delete('/delete', deleteAllPersons)

export default router;
