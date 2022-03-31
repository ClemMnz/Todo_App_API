import pkg from "mongoose";
const { Schema, model } = pkg;

const personSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Prénom required"],
    minlength: [3, "Un minimum de 3 caractères est demandé"],
    maxlength: [45, "Un maximum de 45 caractères est demandé"]
  },
  lastname: {
    type: String,
    required: [true, 'Nom obligtoire'],
    minlength: [3, "Un minimum de 3 caractères est demandé"],
    maxlength: [45, "Un maximum de 45 caractères est demandé"]
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
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Person = model("Person", personSchema);

export { Person };
