const userRoutes = require("./user");
const goalRoutes = require("./goal");
const categoryRoutes = require("./category");
const userGoalRoutes = require("./usergoal");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.use("/api/category", categoryRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/goal", auth, goalRoutes);
  app.use("/api/usergoal", userGoalRoutes);
};
