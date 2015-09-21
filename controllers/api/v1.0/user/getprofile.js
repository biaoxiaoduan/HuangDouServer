/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var uuid = req.query.uuid;
        var result = {success:true, data:''};
        if (uuid == undefined) {
            result.success = false;
            result.data = 'invalid param';
            res.send(result);
        } else {
            var User = Model.User;
            User.find({where: {guid: uuid}}).then(function (user) {
                if (user == null) {
                    result.success = false;
                    result.data = 'user not exist';
                    res.send(result);
                } else {
                    result.success = true;
                    result.data.username = user.username;
                    result.data.cityName = user.cityName;
                    result.data.cityID = user.cityID;
                    result.data.universityID = user.universityID;
                    result.data.universityName = user.universityName;
                    res.send(result);
                }
            }).error(function (err) {
                result.success = false;
                res.send(result);
            });
        }
    });
};


