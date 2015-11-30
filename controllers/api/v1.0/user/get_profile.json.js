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
                    result.data.uuid = user.guid;
                    if (user.username != null)
                        result.data.userName = user.username;
                    if (user.source != null)
                        result.data.source = user.source;
                    if (user.weiboId != null)
                        result.data.weiboId = user.weiboId;
                    if (user.wechatId != null)
                        result.data.wechatId = user.wechatId;
                    if (user.qqId != null)
                        result.data.qqId = user.qqId;
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
                        result.data.role = parseInt(user.role);
                    if (user.highSchoolName != null)
                        result.data.highSchoolName = user.highSchoolName;
                    result.data.follower = user.follower;
                    result.data.following = user.following;
                    result.data.statusCount = user.statusCount;
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
