/**
 * Created by yanbiao on 10/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        //var mobileContactList = req.body.mobileContact;
        var member1 = req.body.member1;
        var member2 = req.body.member2;
        var relationType = req.body.relationtype;
        var result = {
            success: true, error: ''
        };
        var RelationShip = Model.Relationship;
        RelationShip.find({
            where: {
                member1: member1,
                member2: member2
            }
        }).then(function (re) {
            if (re == null && relationType == 'follow') {
                var newRe = RelationShip.build({
                    member1: member1,
                    member2: member2,
                    relation: relationType
                });
                newRe.save().then(function onSuccess(shit) {
                    result.success = true;
                    res.send(result);
                });
            } else if (re != null && relationType == 'unfollow'){
                RelationShip.destroy({where:{member1 : member1, member2:member2}}).then(function(msg){
                    result.success = true;
                    res.send(result);
                });
            } else {
                result.success = false;
                res.send(result);
            }
        }).error(function(error){
            result.success = false;
            res.send(result);
        });
    });
};
