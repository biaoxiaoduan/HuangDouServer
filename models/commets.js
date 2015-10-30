/**
 * Created by yanbiao on 10/29/15.
 */

module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        authorId: DataTypes.STRING,
        content: DataTypes.STRING,
        postId: DataTypes.INTEGER,
        parentId: DataTypes.INTEGER,
        lat: DataTypes.FLOAT,
        long: DataTypes.FLOAT
    });

    return Comments;
};
