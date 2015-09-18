/**
 * Created by yanbiao on 9/18/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var City;
    City = sequelize.define("City", {
        cityID: {type:DataTypes.INTEGER, primaryKey: true},
        cityName: DataTypes.STRING,
        shortCity: DataTypes.STRING,
        regionID: DataTypes.INTEGER,
        countryID: DataTypes.INTEGER
    },{
        timestamps: false,
    });

    return City;
};

