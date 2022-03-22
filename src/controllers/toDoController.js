import { Todo } from "../models/Todo";

export const addTask = async (req, res) => {
  if (!req.user) {
    res.json({message: "Utilisateur non connecté"});
}
  if (!req.body) {
    res.status(400).send({message: "La tâche ne peut pas être vide."});
}
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    user: req.body.user,
    created_at: req.body.created_at,
  });
  console.log('user sub when saving: ' + req.body.user)
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

export const getTaskById = async (req, res) => {
  if (!req.user) {
    res.json({message: "Utilisateur non connecté"});
}
  Todo.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).json({ message: "Il y a eu une erreur." });
    });
};

export const listTasks = (req, res) => {
  if (!req.user) {
     res.json({message: "Utilisateur non connecté"});
}
 const sub = req.user.sub
 
  Todo.find({user : sub }).sort({created_at: -1})
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({ message: "Il y a eu une erreur." });
    });
};

export const updateTask = async (req, res) => {

  if (!req.body) {
    return res.status(400).send({
        message: "Les données à mettre à jour sont vides."
    });
}
  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Impossible de mettre à jour la tâche : ${id}. `,
        });
      } else
        res
          .status(200)
          .json({ Todo: data, message: "La tâche a bien été mise à jour." });
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
    res.json({message: "Utilisateur non connecté"});
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

export const findByTitle = async (req) => {
  if (!req.user) {
    res.json({message: "Utilisateur non connecté"});
}
  const { title } = req.query.title;
  console.log(req.query);
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  await Todo.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "Erreur lors de la recherche par titre",
      });
    });
};
