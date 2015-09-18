/**
 * Created by yanbiao on 9/18/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Country;
    Country = sequelize.define("Country", {
        countryID: {type:DataTypes.INTEGER, primaryKey: true},
        countryName: DataTypes.STRING,
        shortCountry: DataTypes.STRING,
        continentID: DataTypes.INTEGER,
        dialCode: DataTypes.INTEGER
    },{
        timestamps: false,
    });

    return Country;
};

