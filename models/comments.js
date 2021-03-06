/**
 * Created by yanbiao on 10/29/15.
 */

module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        authorId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        psId: DataTypes.INTEGER,
        parentId: DataTypes.INTEGER
    });

    return Comments;
};
