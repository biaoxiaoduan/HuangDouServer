/**
 * Created by yanbiao on 10/22/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var uuid = req.query.uuid;
        var result = {
            success:true,
            errorCode: 0,
            data: {
                uuid: uuid,
                username: ''
            }
        };
        if (uuid == undefined) {
            result.success = false;
            result.errorCode = 1;
            res.send(result);
        } else {
            var User = Model.User;
            User.find({where: {guid: uuid}}).then(function (user) {
                if (user == null) {
                    console.log('user not exist');git
                    result.success = false;
                    result.errorCode = 2;
                    res.send(result);
                } else {
                    console.log('user found');
                    result.success = true;
                    if (user.username != null)
                        result.data.username = user.username;
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
