module.exports = (sequelize, Sequelize) => {
  const Enrollment = sequelize.define("Enrollment", {
    progress: {
      type: Sequelize.FLOAT,
      defaultValue: 0, // From 0 to 100 (percentage)
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Enrollment;
};
