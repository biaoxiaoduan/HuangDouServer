/**
 * Created by yanbiao on 10/18/15.
 */
/**
 * Created by yanbiao on 10/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('get follower called');
        var uuid = req.query.uuid;
        var needlist = req.query.needlist;
        //var mobileContactList = req.body.mobileContact;
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
                member2: uuid
            }
        }).then(function (relationships) {
            if (relationships == null) {
                result.success = true;
                result.data.count = 0;
                req.send(result);
            } else {
                result.count = relationships.length;
                if (needlist) {
                    for (var i = 0; i < result.count; i++) {
                        result.data.list.push(relationships[i].member1);
                    }
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
