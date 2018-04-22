/**
 * Created by yanbiao on 04/19/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var member1 = req.body.member1;
        var member2 = req.body.member2;
        var result = {
            success: true,
            errorCode: 0,
            data: {
            }
        };
        var RelationShip = Model.Relationship;
        RelationShip.find({
            where: {
                member1: member1,
                member2: member2
            }
        }).then(function (re) {
            if (re == null) {
                var newRe = RelationShip.build({
                    member1: member1,
                    member2: member2
                });
                newRe.save().then(function onSuccess(shit) {
                    result.success = true;
                    //result.data.member2 = member2;
                    //result.data.isFollow = true;
                    res.send(result);
                });
            } else {
                console.log('already exist');
                res.send(result);
            }
        }).error(function(error){
            console.log(error);
            result.success = false;
            res.send(result);
        });
    });
};
