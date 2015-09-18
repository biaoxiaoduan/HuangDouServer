/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var uuid = req.body.uuid;
        var cityID = req.body.cityID;
        var cityName = req.body.cityName;
        var universityID = req.body.universityID;
        var universityName = req.body.universityName;
        var userName = req.body.userName;
        var result = {success:true,info:''}
        if (uuid != undefined && uuid != null) {
            if (userName == undefined && resCityID == undefined && universityID == undefined) {
                result.success = false;
                result.info = 'invalid parameters';
                res.send(result);
            } else {
                var User = Model.User;
                User.find({where:{guid:uuid}}).then(function(user){
                    if (user == null) {
                        result.success = false;
                        result.info = 'user not exist';
                        res.send(result);
                    } else {
                        if (userName == undefined) {
                            userName = user.username;
                        }
                        if (cityID == undefined) {
                            cityID = user.cityID;
                        }
                        if (cityName == undefined) {
                            cityName = user.city
                        }
                        if (universityID == undefined) {
                            universityID = user.universityID;
                        }
                        if (universityName == undefined) {
                            universityName = user.universityName;
                        }
                        user.updateAttributes({
                            username: userName,
                            cityID: cityID,
                            cityName: cityName,
                            universityID: universityID,
                            universityName: universityName
                        }).then(function(){
                            console.log('update succeed');
                            result.success = true;
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


