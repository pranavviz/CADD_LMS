module.exports = (sequelize, Sequelize) => {
  const Lesson = sequelize.define("Lesson", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    video_url: {
      type: Sequelize.STRING, // URL for video lesson
      allowNull: true,
    },
    duration: {
      type: Sequelize.INTEGER, // Duration in minutes
      allowNull: true,
    },
    order_index: {
      type: Sequelize.INTEGER,
      allowNull: false, // For sorting lessons
    },
  });

  return Lesson;
};
