/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var uuid = req.query.uuid;
        var result = {success:true, error:'',
            data:{
                username:'undefined',
                cityName:'undefined',
                universityID:'undefined',
                universityName:'undefined',
                gender:-1
            }
        };
        if (uuid == undefined) {
            result.success = false;
            result.error = 'invalid param';
            res.send(result);
        } else {
            var User = Model.User;
            User.find({where: {guid: uuid}}).then(function (user) {
                if (user == null) {
                    console.log('user not exist');
                    result.success = false;
                    result.error = 'user not exist';
                    res.send(result);
                } else {
                    console.log('user found');
                    result.success = true;
                    if (user.username != null)
                        result.data.username = user.username;
                    if (user.cityName != null)
                        result.data.cityName = user.cityName;
                    if (user.cityID != null)
                        result.data.cityID = user.cityID;
                    if (user.universityID != null)
                        result.data.universityID = user.universityID;
                    if (user.universityName != null)
                        result.data.universityName = user.universityName;
                    if (user.gender != null) {
                        result.data.gender = user.gender;
                    }
                    if (user.countryName != null)
                        result.data.countryName = user.countryName;
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


