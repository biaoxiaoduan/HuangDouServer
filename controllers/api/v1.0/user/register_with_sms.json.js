'use strict';

var crypto = require('crypto');
var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var telNum = req.body.telNum;
        var password = req.body.password;
        var userName = req.body.userName;
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
                $or: {
                    telNum: telNum,
                    userName: userName
                }
            }
        }).then(function (user) {
            if (user == null) {
                var myDate = new Date();
                var content = telNum + myDate.getMilliseconds();
                var md5 = crypto.createHash('md5');
                md5.update(content);
                var uuid = md5.digest('hex');
                var newUser = User.build({
                    guid: uuid,
                    username: userName,
                    source: 'sms',
                    password: password,
                    telNum: telNum
                });
                newUser.save().error(function(anotherTask) {
                    // you can now access the currently saved task with the variable anotherTask... nice!
                    result.success = false;
                    res.send(result);
                }).then(function onSuccess(shit) {
                    result.success = true;
                    result.data.uuid = uuid;
                    res.send(result);
                });
            } else {
                result.success = false;
                result.errorCode = 1;
                res.send(result);
            }
        }).error(function (err) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
        });
    });

};


