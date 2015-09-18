/**
 * Created by yanbiao on 9/18/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Continent = sequelize.define("Continent", {
        continentID: { type:DataTypes.INTEGER, primaryKey:true},
        continentName: DataTypes.STRING
    });

    return Continent;
};

