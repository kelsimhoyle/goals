const userRoutes = require("./user");
const goalRoutes = require("./goal");
const categoryRoutes = require("./category");
const userGoalRoutes = require("./usergoal");

module.exports = (app) => {
    app.use("/api/category", categoryRoutes);
    app.use("/api/user", userRoutes)
    app.use("/api/goal", goalRoutes)
    app.use("/api/usergoal", userGoalRoutes)
};