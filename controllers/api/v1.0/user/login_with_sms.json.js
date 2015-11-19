'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var telNum = req.query.telNum;
        var password = req.query.password;
        var User = Model.User;
        var result = {
            success: true,
            errorCode: 0,
            data: {
                uuid: ''
            }
        };
        User.find({
            where: {
                telNum: telNum,
                password: password,
                source: 'sms'
            }
        }).then(function (user) {
            console.log("find success");
            if (user == null) {
                console.log("no user found");
                result.success = false;
                result.errorCode = 1;
            } else {
                result.data.uuid = user.guid;
                result.success = true;
            }
            res.send(result);
        }).error(function (err) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
        });
    });

};


