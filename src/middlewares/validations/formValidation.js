import pkg from "express-validator";
const { check, oneOf } = pkg;
const message =
  "Le status doit correspondre soit à 'Nouvelle', 'En cours' ou 'Terminée'";

export const taskValidation = [
  check("title", "Le titre est requis.").not().isEmpty().trim(),
  check(
    "title",
    "L'identifiant doit comporter entre 3 et 25 caractères."
  ).isLength({ min: 3, max: 25 }),
  check("description").not().isEmpty().withMessage("Le statut est requis."),
  check("description")
    .isLength({
      min: 3,
      max: 200,
    })
    .withMessage("La description doit contenir entre 3 et 200 caractères"),
  check("status").not().isEmpty().withMessage("Le status est requis."),
  oneOf(
    [
      check("status").equals("Nouvelle"),
      check("status").equals("En cours"),
      check("status").equals("Terminée"),
    ],
    message
  ),

];

export const personValidation =[

check("firstname", "Le prénom est requis.").not().isEmpty().trim(),
  check(
    "firstname",
    "Le prénom doit comporter entre 3 et 25 caractères."
  ).isLength({ min: 3, max: 25 }),
  check("lastname").not().isEmpty().withMessage("Le nom est requis."),
  check("lastname")
    .isLength({
      min: 3,
      max: 25,
    })
    .withMessage("La description doit contenir entre 3 et 25 caractères")
]