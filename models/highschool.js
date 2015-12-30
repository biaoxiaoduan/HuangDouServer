/**
 * Created by yanbiao on 9/18/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Highschool;
    Highschool = sequelize.define("Highschool", {
        highschoolID: {type:DataTypes.INTEGER, primaryKey: true},
        highschoolName: DataTypes.STRING,
        cityID: DataTypes.INTEGER,
        regionID: DataTypes.INTEGER,
        countryID: DataTypes.INTEGER
    },{
        timestamps: false,
    });

    return Highschool;
};

