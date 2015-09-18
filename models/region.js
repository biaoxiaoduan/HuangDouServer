/**
 * Created by yanbiao on 9/18/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Region;
    Region = sequelize.define("Region", {
        regionID: {type:DataTypes.INTEGER, primaryKey: true},
        regionName: DataTypes.STRING,
        shortRegion: DataTypes.STRING,
        countryID: DataTypes.INTEGER
    },{
        timestamps: false,
    });

    return Region;
};

