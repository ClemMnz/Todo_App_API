import { Todo } from "../models/Todo";

export const addTask = async (req, res) => {
  if (!req.user) {
    res.json({ message: "Utilisateur non connecté" });
  }
  if (!req.body) {
    res.status(400).send({ message: "La tâche ne peut pas être vide." });
  }
  const result = await Todo.findOne({ title: req.body.title }).findOne({
    description: req.body.description,
  });
  if (result) {
    return res.status(400).json({ message: "La tâche existe déjà." });
  }
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    user: req.body.user,
    created_at: req.body.created_at,
    responsible: req.body.responsible,
  });

  await todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Il y a eu une erreur lors de l'ajout." });
    });
};

export const listTasks = (req, res) => {
  if (!req.user) {
    res.json({ message: "Utilisateur non connecté" });
  }

  const title = req.query.title;
  const sub = req.user.sub;
  const responsible = req.query.responsible;
  console.log(responsible);
  var searchTitle = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  var person = responsible ? { responsible: responsible } : {};

  Todo.find(searchTitle)
    .find({ user: sub })
    .find(person)
    .sort({ updated_at: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "Erreur pour lister toutes les tâches",
      });
    });
};

export const updateTask = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données à mettre à jour sont vides.",
    });
  }
  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Impossible de mettre à jour la tâche : ${id}. `,
        });
      } else res.send(data);
    })
    .catch(() => {
      res.status(500).json({ message: "Il y a eu une erreur." });
    });
};

export const deleteTask = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Impossible de supprimer la tâche.",
        });
      } else {
        res.send({
          message: "La tâche a été supprimée.",
        });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Il y a eu une erreur." });
    });
};

export const deleteAllTasks = (req, res) => {
  if (!req.user) {
    res.json({ message: "Utilisateur non connecté" });
  }
  Todo.deleteMany({})
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
