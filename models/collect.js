/**
 * Created by yanbiao on 12/8/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Collect;
    Collect = sequelize.define("Collect", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId: DataTypes.INTEGER,
        psId: DataTypes.INTEGER
    });

    return Collect;
};
