/**
 * Created by yanbiao on 11/5/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log("delete status " + req.query.statusId);
        var Status = Model.Status;
        var statusId = req.query.statusId;
        var result = {
            success:true,
            errorCode: 0,
            data: {
                deletedId: 0
            }
        };
        if (statusId == null || statusId == undefined) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
            return;
        }
        Status.find({
            where:{
                id : statusId
            }
        }).then(function(status){
            var User = Model.User;
            User.find({
                where: {
                    id: status.authorId
                }
            }).then(function(user){
                var statusCount = user.statusCount-1;
                user.updateAttributes({
                    statusCount: statusCount
                });
                Status.destroy({where:{id : statusId}}).then(function(msg){
                    result.success = true;
                    result.deletedId = statusId;
                    res.send(result);
                }).error(function(err){
                    result.success = false;
                    result.data.deletedId = statusId;
                    result.errorCode = -2;
                    res.send(result);
                });
            });
        }).error(function(err){
            result.success = false;
            result.data.deletedId = statusId;
            result.errorCode = -2;
            res.send(result);
        });

    });
}
