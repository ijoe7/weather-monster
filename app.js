const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helper = require("./config/helper");
const cors = require("cors");
const cityRouter = require("./routes/cityRoutes");
const forecastRouter = require("./routes/forecastRoutes");
const temperatureRouter = require("./routes/temperatureRoutes");
const webhookRouter = require("./routes/webhookRoutes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Database connection
const db = require("./config/database");

// Test DB connection
helper.testDB(db);

// Associate models
const City = require("./model/city");
const Temperature = require("./model/temperature");
const Webhook = require("./model/webhook");

Temperature.belongsTo(City, {
  foreignKey: "cityId",
  as: "city",
});
City.hasMany(Temperature, {
  as: "temperatures",
});

Webhook.belongsTo(City, {
  foreignKey: "cityId",
  as: "city",
});
City.hasMany(Webhook, {
  as: "webhooks",
});

db.sync({
  // force: false,
})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use("/cities", cityRouter);
app.use("/temperatures", temperatureRouter);
app.use("/forecasts", forecastRouter);
app.use("/webhooks", webhookRouter);

app.use("/", (req, res) => {
  res.send("Hello, Welcome to Weather Monster API");
});

app.use((req, res, next)=>{
    let err = new Error(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

engines = {
  node: "14.16.0",
  npm: "8.1.0",
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
