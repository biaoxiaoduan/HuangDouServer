/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var userName = req.body.userName;
        var uuid = req.body.uuid;
        var User = Model.User;
        var result = {
            success: true,
            errorCode: 0,
            data: {
            }
        };
        User.find({
            where: {
                guid: uuid
            }
        }).then(function (user) {
            if (user != null) {
                User.find({
                    where: {
                        userName: userName
                    }
                }).then(function (dup) {
                    if (dup != null) {
                        console.log('username exist');
                        result.success = false;
                        result.errorCode = 2;
                        res.send(result);
                    } else {
                        user.updateAttributes({
                            username: userName
                        }).then(function(){
                            result.success = true;
                            res.send(result);
                        }).error(function(err){
                            console.log(err)
                            result.success = false;
                            result.errorCode = -1;
                            res.send(result);
                        });
                    }
                }).error(function (err) {
                    console.log(err)
                    result.success = false;
                    result.errorCode = -1;
                    res.send(result);
                });
            } else {
                console.log('user not exist')
                result.success = false;
                result.errorCode = 1;
                res.send(result);
            }

        }).error(function (err) {
            console.log(err)
            result.success = false;
            result.errorCode = -1;
            res.send(result);
        });
    });
};


