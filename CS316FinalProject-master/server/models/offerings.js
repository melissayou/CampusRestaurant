'use strict';
module.exports = (sequelize, DataTypes) => {
    const Offering = sequelize.define('offering', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      restaurant_id: {
        type: DataTypes.INTEGER
      },
      offering_name: {
        type: DataTypes.STRING
      },
      offering_price: {
        allowNull:true,
        type: DataTypes.FLOAT
      },
      offering_rating: {
        allowNull:true,
        type: DataTypes.FLOAT
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },{
      underscored:true
    });
    return Offering;
};
