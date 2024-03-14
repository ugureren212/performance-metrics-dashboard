import express from "express";
import router from "./routes/routes";

export const app = express();
const PORT = 3030;

import cors from "cors";

app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
