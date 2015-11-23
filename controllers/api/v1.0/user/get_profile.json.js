/**
 * Created by yanbiao on 11/23/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var uuid = req.query.uuid;
        var result = {
            success:true,
            errorCode: 0,
            data:{
            }
        };
        if (uuid == undefined) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
        } else {
            var User = Model.User;
            User.find(
                {
                    where: {
                        guid: uuid
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
                    if (user.username != null)
                        result.data.username = user.username;
                    if (user.cityName != null)
                        result.data.cityName = user.cityName;
                    if (user.universityName != null)
                        result.data.universityName = user.universityName;
                    if (user.gender != null)
                        result.data.gender = user.gender;
                    if (user.avatarMD5 != null)
                        result.data.avatarMD5 = user.avatarMD5;
                    if (user.countryName != null)
                        result.data.countryName = user.countryName;
                    if (user.telNum != null)
                        result.data.telNum = user.telNum;
                    if (user.interest != null)
                        result.data.interest = user.interest;
                    if (user.role != null)
                        result.data.role = user.role;
                    if (user.highSchoolName != null)
                        result.data.highSchoolName = user.highSchoolName;
                    result.data.follower = user.follower;
                    result.data.following = user.following;
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
