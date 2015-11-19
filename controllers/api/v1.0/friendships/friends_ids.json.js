/**
 * Created by yanbiao on 11/19/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var uuid = req.query.uuid;
        var result = {
            success: true,
            errorCode: 0,
            data: {
                count: 0,
                list: []
            }
        };
        var RelationShip = Model.Relationship;
        RelationShip.findAll({
            where: {
                member1: uuid
            }
        }).then(function (relationships) {
            if (relationships == null) {
                result.success = true;
                result.data.count = 0;
                req.send(result);
            } else {
                result.count = relationships.length;
                console.log(relationships);
                for (var i = 0; i < result.count; i++) {
                    result.data.list.push(relationships[i].member2);
                }
                result.success = true;
                res.send(result);
            }
        }).error(function(error){
            result.success = false;
            res.send(result);
        });
    });
};
