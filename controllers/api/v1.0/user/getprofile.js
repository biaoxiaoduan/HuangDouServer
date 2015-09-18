/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var uuid = req.query.uuid;
        var result = {success:true, info:''};
        if (uuid == undefined) {
            result.success = false;
            result.info = 'invalid param';
            res.send(result);
        } else {
            var User = Model.User;
            User.find({where: {guid: uuid}}).then(function (user) {
                if (user == null) {
                    result.success = false;
                    result.info = 'user not exist';
                    res.send(result);
                } else {
                    result.success = true;
                    result.username = user.username;
                    result.cityName = user.cityName;
                    result.cityID = user.cityID;
                    result.universityID = user.universityID;
                    result.universityName = user.universityName;
                    res.send(result);
                }
            }).error(function (err) {
                result.success = false;
                res.send(result);
            });
        }
    });
};


