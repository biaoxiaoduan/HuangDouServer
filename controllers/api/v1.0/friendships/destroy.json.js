/**
 * Created by yanbiao on 11/19/15.
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
                member2: '',
                isFollow: true
            }
        };
        var RelationShip = Model.Relationship;
        RelationShip.find({
            where: {
                member1: member1,
                member2: member2
            }
        }).then(function (re) {
            if (re != null){
                RelationShip.destroy({where:{member1 : member1, member2:member2}}).then(function(msg){
                    result.success = true;
                    result.data.member2 = member2;
                    result.data.isFollow = false;
                    res.send(result);
                });
            } else {
                console.log('other');
                result.success = false;
                res.send(result);
            }
        }).error(function(error){
            console.log(error);
            result.success = false;
            res.send(result);
        });
    });
};
