/**
 * Created by yanbiao on 10/29/15.
 */

module.exports = function(sequelize, DataTypes) {
    var AfterPS = sequelize.define("AfterPS", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        authorId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        target: DataTypes.INTEGER
    });

    return AfterPS;
};
