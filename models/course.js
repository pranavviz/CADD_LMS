module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("Course", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: Sequelize.STRING, // Store file path for the image
      allowNull: true,
    },
    instructor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER, // Store duration in minutes
      allowNull: true,
    },
    level: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "beginner", // beginner, intermediate, advanced
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Course;
};
