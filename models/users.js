"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        source: DataTypes.STRING,
        weiboId: DataTypes.STRING,
        wechatId: DataTypes.STRING,
        qqId: DataTypes.STRING,
        guid: DataTypes.STRING,
        avatarMD5: DataTypes.STRING,
        cityName: DataTypes.STRING,
        universityName: DataTypes.STRING,
        countryName: DataTypes.STRING,
        highSchoolName: DataTypes.STRING,
        gender: DataTypes.STRING,
        telNum: DataTypes.STRING,
        interest: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.INTEGER,
        following: DataTypes.INTEGER,
        follower: DataTypes.INTEGER
    });

    return User;
};

