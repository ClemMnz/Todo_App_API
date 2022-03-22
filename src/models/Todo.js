import pkg from "mongoose";
const { Schema, model } = pkg;

const STATUS = ["Nouvelle", "En cours", "Terminée"];

const todoSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Titre obligatoire"],
    minlength: [3, "3 caractères au minimum"],
    maxlength: [25, "25 caractères au maximum"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description required"],
    minlength: [3, "3 caractères au minimum"],
    maxlength: [200, "200 caractères au maximum"],
  },
  status: {
    type: String,
    default: "Nouvelle",
    required: [true, "Status required"],
    enum: STATUS,
  },
  user: { type: String, required: [true, "User obligatoire"] },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Todo = model("Todo", todoSchema);

export { Todo };
