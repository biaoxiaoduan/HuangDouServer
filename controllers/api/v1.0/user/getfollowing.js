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
        var uuid = req.query.uuid;
        var needlist = req.query.needlist;
        //var mobileContactList = req.body.mobileContact;
        var result = {
            success: true, error: '', count:0, data:[]
        };
        var RelationShip = Model.Relationship;
        RelationShip.findAll({
            where: {
                member1: uuid
            }
        }).then(function (relationships) {
            if (relationships == null) {
                result.success = true;
                result.count = 0;
                req.send(result);
            } else {
                result.count = relationships.length;
                console.log(relationships);
                if (needlist) {
                    for (var i = 0; i < result.count; i++) {
                        result.data.push(relationships[i].member2);
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
