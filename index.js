import express from "express";
import PrcelBundler from "parcel-bundler";
import bodyParser from "body-parser";

import deviceAllocRouter from "./api/routes/device.allocation.routes.js";
import deviceRouter from "./api/routes/device.routes.js";
import deviceTypeRouter from "./api/routes/device.type.routes.js";
import employeeRouter from "./api/routes/employee.routes.js";
import userRouter from "./api/routes/user.routes.js";

const app = express();
const bundler = new PrcelBundler("./public/index.html", {});

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/device-alloc", deviceAllocRouter);
app.use("/api/devices", deviceRouter);
app.use("/api/device-types", deviceTypeRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/users", userRouter);

app.use(bundler.middleware());

app.use(express.static("./dist"));

app.get("/", function (req, res) {
  res.sendFile("./dist/index.html");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);

  console.log("Server is up and listening in PORT : " + PORT);
});
