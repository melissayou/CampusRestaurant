'use strict';

//node_modules/.bin/sequelize model:create --name Restaurant --attributes "name:string, location:string, origin:string, rating:float"
//node_modules/.bin/sequelize model:create --name Offering --attributes "RestaurantId:integer, offering_name:string, offering_price:float, offering_rating:float"
//node_modules/.bin/sequelize db:migrate

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
//const env = require('./env');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var DATABASE_URL = process.env.DATABASE_URL || 'jdbc:postgresql://localhost:5432/food';
// const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
//   host: env.DATABASE_HOST,
//   port: env.DATABASE_PORT,
//   dialect: env.DATABASE_DIALECT
// });
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
//var config    = require(__dirname + '/../config.json')[env];
const db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(function(file) {
//     if (file.slice(-3) !== '.js') return;
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.offerings = require('../models/offerings.js')(sequelize, Sequelize);
db.restaurants = require('../models/restaurants.js')(sequelize, Sequelize);
//db.comments = require('../models/comments.js')(sequelize, Sequelize);

//Relations
db.restaurants.hasMany(db.offerings);
db.offerings.belongsTo(db.restaurants);
module.exports = db;
