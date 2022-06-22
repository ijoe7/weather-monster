const _ = require("underscore");
exports.testDB = async (db) => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

exports.validateParams = (req, next, request) => {
  request.map((item) => {
    if (!req.body[item]) throw new Error(`${item} is required`);
  });
  let data = _.pick(req.body, request);
  return data;
};
