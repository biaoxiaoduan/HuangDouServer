/**
 * Created by yanbiao on 10/29/15.
 */

module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        type: DataTypes.STRING,//{"normal", "experience", "news"}
        numLike: DataTypes.INTEGER,
        authorId: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        images: DataTypes.STRING(1024),
        tag: DataTypes.STRING,
        lat: DataTypes.FLOAT,
        long: DataTypes.FLOAT
    });

    return Status;
};
