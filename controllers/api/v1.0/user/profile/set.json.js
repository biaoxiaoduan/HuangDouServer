/**
 * Created by yanbiao on 04/21/18.
 */
'use strict';

var Model = require('../../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var uuid = req.body.uuid;
        var avatar = req.body.avatar;
        var username = req.body.username;

        var result = {
            success: true,
            errorCode: 0,
            data:{
            }
        };
        if (uuid === undefined || uuid == null) {
            result.success = false;
            result.errorCode = -1;
            console.log('invalid uuid');
            res.send(result);
        } else {
            var User = Model.User;
            User.find({
                where:{
                    uuid:uuid
                }
            }).then(function(user){
                if (user == null) {
                    result.success = false;
                    result.errorCode = 1;
                    res.send(result);
                } else {
                    result.data.uuid = user.uuid;
                    if (avatar === undefined) {
                        avatar = user.avatar;
                    }
                    if (username === undefined) {
                        username = user.username;
                    }
                    user.updateAttributes({
                        avatar: avatar,
                        username: username
                    }).then(function(){
                        console.log('update succeed');
                        result.success = true;
                        if (user.username != null)
                            result.data.username = user.username;
                        if (user.avatar != null)
                            result.data.avatar = user.avatar;
                        res.send(result);
                    }).error(function(){
                        console.log('update failed');
                        result.success = false;
                        res.send(result);
                    });
                }
            }).error(function(err){
                console.log(err);
                res.send(result);
            });

        }
    });
};
