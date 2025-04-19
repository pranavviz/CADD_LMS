const { Sequelize } = require("sequelize");
const dbConfig =
  require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require("./user")(sequelize, Sequelize);
db.Course = require("./course")(sequelize, Sequelize);
db.Module = require("./module")(sequelize, Sequelize);
db.Lesson = require("./lesson")(sequelize, Sequelize);
db.Enrollment = require("./enrollment")(sequelize, Sequelize);

// Relationships
db.User.hasMany(db.Course, { foreignKey: "instructor_id" });
db.Course.belongsTo(db.User, { foreignKey: "instructor_id" });

db.Course.hasMany(db.Module, { foreignKey: "course_id" });
db.Module.belongsTo(db.Course, { foreignKey: "course_id" });

db.Module.hasMany(db.Lesson, { foreignKey: "module_id" });
db.Lesson.belongsTo(db.Module, { foreignKey: "module_id" });

db.User.belongsToMany(db.Course, {
  through: db.Enrollment,
  foreignKey: "user_id",
});
db.Course.belongsToMany(db.User, {
  through: db.Enrollment,
  foreignKey: "course_id",
});

module.exports = db;
