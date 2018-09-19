'use strict';
module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('restaurant',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      origin: {
        type: DataTypes.STRING
      },
      time: {
        type:DataTypes.STRING
      },
      rating: {
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
    return Restaurant;
};
