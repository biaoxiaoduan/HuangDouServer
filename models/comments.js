/**
 * Created by yanbiao on 10/29/15.
 */

module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        authorId: DataTypes.STRING,
        content: DataTypes.STRING,
        statusId: DataTypes.INTEGER,
        parentId: DataTypes.INTEGER,
        lat: DataTypes.FLOAT,
        long: DataTypes.FLOAT
    });

    return Comments;
};
