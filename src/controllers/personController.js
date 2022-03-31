import { Person } from "../models/Person";

export const addPerson = async (req, res) => {
  const result = await Person.findOne({ lastname: req.body.lastname }).findOne({
    firstname: req.body.firstname,
  });

  if (result) {
    return res.status(400).json({ message: "La personne existe déjà." });
  }

  const person = new Person({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    created_at: req.body.created_at,
    user: req.body.user,
  });

  await person
    .save(person)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Il y a eu une erreur lors de la sauvegarde" });
    });
};

export const listPersons = async (req, res) => {
  if (!req.user) {
    res.json({ message: "Utilisateur non connecté" });
  }

  const sub = req.user.sub;
  Person.find({ user: sub })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "Erreur pour lister les personnes.",
      });
    });
};

export const updatePerson = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Les données à mettre à jour sont vides.",
        });
      }
      const id = req.params.id;
    
      Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).json({
              message: `Impossible de mettre à jour la personne : ${id}. `,
            });
          } else res.send(data);
        })
        .catch(() => {
          res.status(500).json({ message: "Il y a eu une erreur." });
        });
    };

export const deletePerson = async (req, res) => {
    Person.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Impossible de supprimer la personne.",
        });
      } else {
        res.send({
          message: "La personne a été supprimée.",
        });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Il y a eu une erreur." });
    });
};

export const deleteAllPersons = (req, res) => {
    if (!req.user) {
        res.json({ message: "Utilisateur non connecté" });
      }
      Person.deleteMany({})
        .then(() =>
          res.send({
            message: "Suppression réussie.",
          })
        )
        .catch(() => {
          res.status(500).json({
            message: "Erreur lors de la supression totale.",
          });
        });
    };
    
