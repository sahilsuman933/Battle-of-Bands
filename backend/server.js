import express from "express";
import router from "./routes";
import cors from "cors";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import morganBody from "morgan-body";

const app = express();
var log = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const port = 8080;

app.use(cors());
app.use(bodyParser.json());
morganBody(app, {
  noColors: true,
  logRequestBody: true,
  stream: log,
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
