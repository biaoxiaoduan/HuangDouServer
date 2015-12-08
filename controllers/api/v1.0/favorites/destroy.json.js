/**
 * Created by yanbiao on 12/8/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var userId = req.body.userId;
        var statusId = req.body.statusId;
        var Favorite = Model.Favorite;
        var Status = Model.Status;
        var User = Model.User;
        var result = {
            success: true,
            errorCode: 0,
            data: {
            }
        };
        Favorite.find({
            where:{
                userId: userId,
                statusId: statusId
            }
        }).then(function(favorite){
            if (favorite != null) {
                console.log('like found');
                Favorite.destroy({
                    where:{
                        userId: userId,
                        statusId: statusId
                    }
                }).then(function(){
                    Status.find({
                        where:{
                            id:statusId
                        }
                    }).then(function(status){
                        status.updateAttributes({
                            numLike: status.numLike-1
                        });

                        User.find({
                            where:{
                                guid:status.authorId
                            }
                        }).then(function(user){
                            user.updateAttributes({
                                numUseful: user.numUseful-1
                            });
                        });
                    });
                    result.success = true;
                    res.send(result);
                }).error(function(){
                    result.success = false;
                    res.send(result);
                });
            } else {
                result.success = false;
                res.send(result);
            }
        }).error(function(err){
            result.success = false;
            res.send(result);
        });
    });
};
