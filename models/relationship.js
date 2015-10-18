/**
 * Created by yanbiao on 10/18/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Relationship;
    Relationship = sequelize.define("Relationship", {
        relationshipID: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        member1: DataTypes.STRING,
        member2: DataTypes.STRING,
        relation: DataTypes.STRING
    });

    return Relationship;
};
