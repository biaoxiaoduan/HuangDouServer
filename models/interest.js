/**
 * Created by shangshangli on 15/11/18.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Interest;
    Interest = sequelize.define("Interest", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: DataTypes.STRING,
        parent: DataTypes.INTEGER,
        isSub: DataTypes.BOOLEAN,
        hot: DataTypes.INTEGER,
        role: DataTypes.INTEGER
    },{
        timestamps: false,
    });

    return Interest;
};
