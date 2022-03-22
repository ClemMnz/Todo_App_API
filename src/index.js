import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router";
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_LOCAL , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error, "Erreur lors de la connection à la db."));

app.use("/api", router);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Your application is running on port : ${PORT}`);
});
