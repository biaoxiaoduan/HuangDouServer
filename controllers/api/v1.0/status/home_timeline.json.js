/**
 * Created by yanbiao on 10/29/15.
 */
'use strict';

var Model = require('../../../../models')
var Sequelize = require('sequelize');

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('home_timeline called');
        var uuid = req.query.uuid;
        var since_id = req.query.since_id;
        var max_id = req.query.max_id;
        var count = req.query.count;
        var result = {
            success: true,
            error: '',
            data:{
                statuses:[]
            }
        };
        var Status = Model.Status;
        if (uuid == null) {
            result.success = false;
            result.error = 'invalid params';
            res.send(result);
            return;
        }
        if (count == null || count > 100 || count < 1) {
            count = 100;
        }
        var RelationShip = Model.Relationship;
        RelationShip.findAll({
            where: {
                member1: uuid
            }
        }).then(function (relationships) {
            var uuidList = [];
            uuidList.push(uuid);
            for (var i = 0; i < relationships.length; i++ ) {
                uuidList.push(relationships[i].member2);
            }
            console.log(uuidList);
            if (max_id != null && max_id != 0) {
                Status.findAll({
                    where: {
                            id:{lte:max_id}
                        },
                    limit: count,
                    order: 'id DESC'
                }).then(function(statuses){
                    for (var i = 0; i < statuses.length; i++) {
                        var status = statuses[i];
                        var hasuuid = false;
                        for (var m = 0; m < uuidList.length; m++) {
                            if (status.authorId == uuidList[m]) {
                                hasuuid = true;
                                break;
                            }
                        }
                        if (hasuuid) {
                            var item = {
                                statusId: status.id,
                                authorId: status.authorId,
                                title: status.title,
                                content: status.content,
                                images: status.images,
                                tag: status.tag,
                                lat: status.lat,
                                long: status.long
                            };
                            result.data.statuses.push(item);
                        }
                    }
                    res.send(result);
                }).error(function(error){
                    result.success = false;
                    res.send(result);
                });
            } else {
                if (since_id != null && since_id != 0) {
                    console.log('use since id ' + since_id);
                    console.log('count is ' + count);
                    Status.findAll({
                        where: {
                                id:{gte:since_id}
                            },
                        limit: count,
                        order: 'id ASC'
                    }).then(function(statuses){
                        console.log(statuses.length);

                        for (var i = 0; i < statuses.length; i++) {
                            var status = statuses[i];
                            var hasuuid = false;
                            console.log("status author is " + status.authorId);
                            for (var m = 0; m < uuidList.length; m++) {
                                if (status.authorId == uuidList[m]) {
                                    hasuuid = true;
                                    break;
                                }
                            }
                            if (hasuuid) {
                                var item = {
                                    statusId: status.id,
                                    authorId: status.authorId,
                                    title: status.title,
                                    content: status.content,
                                    images: status.images,
                                    tag: status.tag,
                                    lat: status.lat,
                                    long: status.long
                                };
                                result.data.statuses.push(item);
                            }
                        }
                        res.send(result);
                    }).error(function(error){
                        result.success = false;
                        res.send(result);
                    });
                } else {
                    result.success = false;
                    result.error = 'invalid params';
                    res.send(result);
                }
            }
        }).error(function (err){
            result.success = false;
            res.send(result);
        });
    });
};
