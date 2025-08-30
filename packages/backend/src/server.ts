import express from "express";
import dogsRouter from "./routes/dogs.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/dogs", dogsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
