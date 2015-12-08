/**
 * Created by yanbiao on 12/8/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Favorite;
    Favorite = sequelize.define("Favorite", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: DataTypes.STRING,
        statusId: DataTypes.INTEGER
    });

    return Favorite;
};
