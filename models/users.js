"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        source: DataTypes.STRING,
        uid: DataTypes.STRING,
        guid: DataTypes.STRING,
        cityID: DataTypes.INTEGER,
        universityID: DataTypes.INTEGER
    });

    return User;
};

