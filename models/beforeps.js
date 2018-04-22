/**
 * Created by yanbiao on 10/29/15.
 */

module.exports = function(sequelize, DataTypes) {
    var BeforePS = sequelize.define("BeforePS", {
        id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        authorId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        refImage: DataTypes.STRING
    });

    return BeforePS;
};
