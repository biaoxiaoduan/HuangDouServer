/**
 * Created by yanbiao on 12/8/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var userId = req.body.userId;
        var statusId = req.body.statusId;
        var result = {
            success: true,
            errorCode: 0,
            data : {
                statusId: 0
            }
        };
        var Like = Model.Like;
        var Status = Model.Status;
        var User = Model.User;
        Like.find({
            where:{
                userId: userId,
                statusId: statusId
            }
        }).then(function(like){
            if (like == null) {
                var newLike = Like.build({
                    userId: userId,
                    statusId: statusId
                });
                newLike.save().error(function(err) {
                    result.success = false;
                    res.send(result);
                }).then(function(like){
                    Status.find({
                        where:{
                            id:statusId
                        }
                    }).then(function(status){
                        status.updateAttributes({
                            numLike: status.numLike+1
                        });

                        User.find({
                            where:{
                                guid:status.authorId
                            }
                        }).then(function(user){
                            user.updateAttributes({
                                numLike: user.numLike+1
                            });
                        });
                    });
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
