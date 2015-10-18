"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        source: DataTypes.STRING,
        uid: DataTypes.STRING,
        guid: DataTypes.STRING,
        avatarID: DataTypes.STRING,
        cityID: DataTypes.INTEGER,
        universityID: DataTypes.INTEGER,
        cityName: DataTypes.STRING,
        universityName: DataTypes.STRING,
        countryID: DataTypes.INTEGER,
        countryName: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        telNum: DataTypes.STRING
    });

    return User;
};

