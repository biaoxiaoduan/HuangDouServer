/**
 * Created by yanbiao on 10/29/15.
 */

module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        authorId: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        images: DataTypes.STRING,
        tag: DataTypes.STRING,
        lat: DataTypes.FLOAT,
        long: DataTypes.FLOAT
    });

    return Status;
};
