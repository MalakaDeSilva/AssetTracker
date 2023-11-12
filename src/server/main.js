const express = require("express");
const ViteExpress = require("vite-express");
const bodyParser = require("body-parser");

const app = express();

const deviceAllocRouter = require("./api/routes/device.allocation.routes");
const deviceRouter = require("./api/routes/device.routes");
const deviceTypeRouter = require("./api/routes/device.type.routes");
const employeeRouter = require("./api/routes/employee.routes");
const userRouter = require("./api/routes/user.routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/device-alloc", deviceAllocRouter);
app.use("/api/devices", deviceRouter);
app.use("/api/device-types", deviceTypeRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/users", userRouter);

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
