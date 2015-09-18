/**
 * Created by yanbiao on 9/18/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var University;
    University = sequelize.define("University", {
        universityID: {type:DataTypes.INTEGER, primaryKey: true},
        universityName: DataTypes.STRING,
        cityID: DataTypes.INTEGER,
        regionID: DataTypes.INTEGER,
        countryID: DataTypes.INTEGER
    },{
        timestamps: false,
    });

    return University;
};

