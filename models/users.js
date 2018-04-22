"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        uuid: DataTypes.INTEGER,
        username: DataTypes.STRING,
        source: DataTypes.STRING,
        facebook: DataTypes.STRING,
        google: DataTypes.STRING,
        twitter: DataTypes.STRING,
        avatar: DataTypes.STRING
    });

    return User;
};

