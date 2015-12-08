/**
 * Created by yanbiao on 11/23/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var uuid = req.body.uuid;
        var cityName = req.body.cityName;
        var universityName = req.body.universityName;
        var countryName = req.body.countryName;
        var highSchoolName = req.body.highSchoolName;
        var gender = req.body.gender;
        var avatarMD5 = req.body.avatarMD5;
        var telNum = req.body.telNum;
        var interest = req.body.interest;
        var role = req.body.role;
        var result = {
            success: true,
            errorCode: 0,
            data:{
            }
        };
        if (uuid != undefined && uuid != null) {
            result.data.uuid = uuid;
            var User = Model.User;
            User.find({
                where:{
                    guid:uuid
                }
            }).then(function(user){
                if (user == null) {
                    result.success = false;
                    result.errorCode = 1;
                    res.send(result);
                } else {
                    if (cityName == undefined) {
                        cityName = user.cityName;
                    }
                    if (universityName == undefined) {
                        universityName = user.universityName;
                    }
                    if (countryName == undefined) {
                        countryName = user.countryName;
                    }
                    if (highSchoolName == undefined) {
                        highSchoolName = user.highSchoolName;
                    }
                    if (gender == undefined) {
                        gender = user.gender;
                    }
                    if (telNum == undefined) {
                        telNum = user.telNum;
                    }
                    if (interest == undefined) {
                        interest = user.interest;
                    }
                    if (role == undefined) {
                        role = user.role;
                    }
                    if (avatarMD5 == undefined) {
                        avatarMD5 = user.avatarMD5;
                    }
                    user.updateAttributes({
                        cityName: cityName,
                        universityName: universityName,
                        highSchoolName: highSchoolName,
                        countryName: countryName,
                        gender: gender,
                        avatarMD5: avatarMD5,
                        telNum:telNum,
                        interest:interest,
                        role:role
                    }).then(function(){
                        console.log('update succeed');
                        result.success = true;
                        if (user.username != null)
                            result.data.username = user.username;
                        if (user.cityName != null)
                            result.data.cityName = user.cityName;
                        if (user.countryName != null)
                            result.data.countryName = user.countryName;
                        if (user.universityName != null)
                            result.data.universityName = user.universityName;
                        if (user.gender != null)
                            result.data.gender = user.gender;
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
                        result.data.numLike = user.numLike;
                        result.data.numUseful = user.numUseful;
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
