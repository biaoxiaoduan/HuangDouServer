/**
 * Created by yanbiao on 11/19/15.
 */
var Model = require('../../../../models')
var async = require('async')

module.exports = function (router) {

    router.get('/', function (req, res) {
        //console.log(req.body);
        //var mobileContactList = req.body.mobileContact;
        //var weibo = JSON.parse(req.body.weibo);
        var uuid = req.query.uuid;
        //console.log(weibo);
        var result = {
            success: true,
            errorCode: 0,
            data: {
                count: 0,
                list: []
            }
        };
        var telArray = ['18611712493', '15210503191', '18618177787', '18600514081', '18801222804', '15120049755', '13320208080'];
        var User = Model.User;
        User.all().then(function (users) {
            if (users == null || users.length == 0) {
                result.data.count = 0;
                result.success = true;
                res.send(result);
            } else {
                async.eachSeries(users, function(user, callback){
                    for (var i = 0; i < telArray.length; i++) {
                        if (telArray[i] == user.telNum) {
                            var item = {};
                            item.uuid = user.guid;
                            if (user.username != null)
                                item.userName = user.username;
                            if (user.source != null)
                                item.source = user.source;
                            if (user.weiboId != null)
                                item.weiboId = user.weiboId;
                            if (user.wechatId != null)
                                item.wechatId = user.wechatId;
                            if (user.qqId != null)
                                item.qqId = user.qqId;
                            if (user.cityName != null)
                                item.cityName = user.cityName;
                            if (user.universityName != null)
                                item.universityName = user.universityName;
                            if (user.gender != null)
                                item.gender = user.gender;
                            if (user.avatarMD5 != null)
                                item.avatarMD5 = user.avatarMD5;
                            if (user.countryName != null)
                                item.countryName = user.countryName;
                            if (user.telNum != null)
                                item.telNum = user.telNum;
                            if (user.interest != null)
                                item.interest = user.interest;
                            if (user.role != null)
                                item.role = parseInt(user.role);
                            if (user.highSchoolName != null)
                                item.highSchoolName = user.highSchoolName;
                            item.follower = user.follower;
                            item.following = user.following;
                            result.data.list.push(item);
                            callback();
                            return;
                        }
                    }
                    callback();
                }, function(err){
                    if (err == undefined) {
                        result.success = true;
                        result.data.count = result.data.list.length;
                    } else {
                        result.success = false;
                    }
                    res.send(result);
                });
            }
        });
    });
};
