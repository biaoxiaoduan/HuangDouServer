/**
 * Created by yanbiao on 04/21/18.
 */
'use strict';

var Model = require('../../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var uuid = req.query.uuid;
        var result = {
            success:true,
            errorCode: 0,
            data:{
            }
        };
        if (uuid === undefined) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
        } else {
            var User = Model.User;
            User.find(
                {
                    where: {
                        uuid: uuid
                    }
                }).then(function (user) {
                if (user == null) {
                    console.log('user not exist');
                    result.success = false;
                    result.errorCode = -2;
                    res.send(result);
                } else {
                    console.log('user found');
                    result.success = true;
                    result.data.uuid = user.uuid;
                    if (user.username != null)
                        result.data.username = user.username;
                    if (user.avatar != null)
                        result.data.avatar = user.avatar;
                    if (user.facebook != null)
                        result.data.facebook = user.facebook;
                    res.send(result);
                }
            }).error(function (err) {
                console.log('Exception ' + err);
                result.success = false;
                res.send(result);
            });
        }
    });
};
