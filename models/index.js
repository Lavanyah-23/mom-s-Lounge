"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if(config.url){
  sequelize = new Sequelize(config.url, config);
}else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to the database:', err));

  // Import models (initialize with sequelize and DataTypes)
const User = require("./user")(sequelize, Sequelize.DataTypes);
const Story = require("./story")(sequelize, Sequelize.DataTypes);
const Comment = require("./comment")(sequelize, Sequelize.DataTypes);
const Like = require("./like")(sequelize, Sequelize.DataTypes);
const CommentLike = require("./commentLike")(sequelize, Sequelize.DataTypes);
const Category = require("./category")(sequelize, Sequelize.DataTypes);
const Marketplace = require("./marketplace")(sequelize, Sequelize.DataTypes);
const AiChat = require("./aiChat")(sequelize, Sequelize.DataTypes);

// Add models to db object
db.User = User;
db.Story = Story;
db.Comment = Comment;
db.Like = Like;
db.CommentLike = CommentLike;
db.Category = Category;
db.Marketplace = Marketplace;
db.AiChat = AiChat;

// Define associations
User.hasMany(Story);
Story.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Story.hasMany(Comment);
Comment.belongsTo(Story);

Category.hasMany(Story);
Story.belongsTo(Category);

User.hasMany(Marketplace);
Marketplace.belongsTo(User);

User.hasMany(AiChat);
AiChat.belongsTo(User);

// Like associations
User.hasMany(Like);
Like.belongsTo(User);

Story.hasMany(Like);
Like.belongsTo(Story);

// CommentLike associations
User.hasMany(CommentLike);
CommentLike.belongsTo(User);

Comment.hasMany(CommentLike);
CommentLike.belongsTo(Comment);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
