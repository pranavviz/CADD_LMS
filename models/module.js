module.exports = (sequelize, Sequelize) => {
  const Module = sequelize.define("Module", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    order_index: {
      type: Sequelize.INTEGER,
      allowNull: false, // For sorting modules
    },
  });

  return Module;
};
