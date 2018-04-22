/**
 * Created by yanbiao on 12/8/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Rate;
    Rate = sequelize.define("Rate", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: DataTypes.INTEGER,
        psId: DataTypes.INTEGER,
        score: DataTypes.INTEGER
    });

    return Rate;
};
