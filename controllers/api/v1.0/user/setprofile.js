/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var uuid = req.body.uuid;
        var cityID = req.body.cityID;
        var cityName = req.body.cityName;
        var universityID = req.body.universityID;
        var universityName = req.body.universityName;
        var countryID = req.body.countryID;
        var countryName = req.body.countryName;
        var userName = req.body.userName;
        var gender = req.body.gender;
        var avatarID = req.body.avatarID;
        var telNum = req.body.telNum;
        var result = {
            success:true, error:'',
            data:{
                uuid: 'undefined',
                username:'undefined',
                cityName:'undefined',
                universityID:'undefined',
                universityName:'undefined',
                countryName: 'undefined',
                avatarID:'undefined',
                telNum:'undefined',
                gender:-1
            }
        };
        if (uuid != undefined && uuid != null) {
            result.data.uuid = uuid;
            if (userName == undefined && cityID == undefined && universityID == undefined) {
                result.success = false;
                result.error = 'invalid parameters';
                res.send(result);
            } else {
                var User = Model.User;
                User.find({where:{guid:uuid}}).then(function(user){
                    if (user == null) {
                        result.success = false;
                        result.error = 'user not exist';
                        res.send(result);
                    } else {
                        if (userName == undefined) {
                            userName = user.username;
                        }
                        if (cityID == undefined) {
                            cityID = user.cityID;
                        }
                        if (cityName == undefined) {
                            cityName = user.cityName;
                        }
                        if (universityID == undefined) {
                            universityID = user.universityID;
                        }
                        if (universityName == undefined) {
                            universityName = user.universityName;
                        }
                        if (countryID == undefined) {
                            countryID = user.countryID;
                        }
                        if (countryName == undefined) {
                            countryName = user.countryName;
                        }
                        if (gender == undefined) {
                            gender = user.gender;
                        }
                        if (avatarID == undefined) {
                            avatarID = user.avatarID;
                        }
                        if (telNum == undefined) {
                            telNum = user.telNum;
                        }
                        user.updateAttributes({
                            username: userName,
                            cityID: cityID,
                            cityName: cityName,
                            universityID: universityID,
                            universityName: universityName,
                            countryID: countryID,
                            countryName: countryName,
                            gender: gender,
                            avatarID: avatarID,
                            telNum:telNum
                        }).then(function(){
                            console.log('update succeed');
                            result.success = true;
                            if (user.username != null)
                                result.data.username = user.username;
                            if (user.cityName != null)
                                result.data.cityName = user.cityName;
                            if (user.countryName != null)
                                result.data.countryName = user.countryName;
                            if (user.cityID != null)
                                result.data.cityID = user.cityID;
                            if (user.universityID != null)
                                result.data.universityID = user.universityID;
                            if (user.universityName != null)
                                result.data.universityName = user.universityName;
                            if (user.gender != null)
                                result.data.gender = user.gender;
                            if (user.avatarID != null)
                                result.data.avatarID = user.avatarID;
                            if (user.telNum != null)
                                result.data.telNum = user.telNum;
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
        } else {
            res.send('invalid param');
        }
    });
};


