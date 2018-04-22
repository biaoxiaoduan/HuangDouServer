/**
 * Created by yanbiao on 04/19/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('get follower called');
        var uuid = req.query.uuid;

        var result = {
            success: true,
            errorCode: 0,
            data: {
                count: 0,
                list: []
            }
        };
        var condition = {
            where: {
                member1: uuid
            }
        };

        var RelationShip = Model.Relationship;
        RelationShip.findAll(condition).then(function (relationships) {
            if (relationships == null || relationships.length === 0) {
                result.success = true;
                result.data.count = 0;
                console.log(result);
                res.send(result);
            } else {
                result.data.count = relationships.length;
                for (var i = 0; i < relationships.length; i++) {
                    result.data.list.push(relationships[i].member2);
                }
                res.send(result);
            }
        }).error(function(error){
            result.success = false;
            res.send(result);
        });
    });
};
