/**
 * Created by yanbiao on 11/19/15.
 */
'use strict';

var Model = require('../../../../models')
var async = require('async')

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('get follower called');
        var uuid = req.query.uuid;
        var since_id = parseInt(req.query.since_id);
        var max_id = parseInt(req.query.max_id);
        var count = req.query.count;

        var result = {
            success: true,
            errorCode: 0,
            data: {
                count: 0,
                list: []
            }
        };
        var condition = {};
        if (count == undefined || count > 200) {
            count = 200;
        }
        if (since_id == 0 && max_id == 0) {
            condition.where = {
                member2: uuid,
                relationshipID: {
                    gte: 0
                }
            };
            condition.limit = count;
            condition.order = 'relationshipID DESC';
        } else {
            if (since_id != 0) {
                condition.where = {
                    member2: uuid,
                    relationshipID: {
                        gte: since_id
                    },
                };
                condition.limit = count;
                condition.order = 'relationshipID ASC';
            } else {
                condition.where = {
                    member2: uuid,
                    relationshipID: {
                        lte: max_id
                    }
                };
                condition.limit = count;
                condition.order = 'relationshipID DESC';
            }
        }

        console.log(condition);
        var RelationShip = Model.Relationship;
        var User = Model.User;
        RelationShip.findAll(condition).then(function (relationships) {
            if (relationships == null || relationships.length == 0) {
                result.success = true;
                result.data.count = 0;
                result.data.max_id = 0;
                result.data.min_id = 0;
                console.log(result);
                res.send(result);
            } else {
                result.data.count = relationships.length;
                if (condition.order == 'relationshipID DESC') {
                    result.data.min_id = relationships[relationships.length - 1].relationshipID;
                    result.data.max_id = relationships[0].relationshipID;
                } else {
                    result.data.max_id = relationships[relationships.length - 1].relationshipID;
                    result.data.min_id = relationships[0].relationshipID;
                }
                async.eachSeries(relationships, function(relation, callback){
                    var uuid = relation.member1;
                    User.find(
                        {
                            where: {
                                guid: uuid
                            }
                        }).then(function (user) {
                        if (user == null) {
                            callback('user not exist');
                        } else {
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
                        }
                    }).error(function (err) {
                        callback(err)
                    });
                }, function(err){
                    if (err == undefined) {
                        result.success = true;
                    } else {
                        result.success = false;
                    }
                    res.send(result);
                });
            }
        }).error(function(error){
            result.success = false;
            res.send(result);
        });
    });
};
