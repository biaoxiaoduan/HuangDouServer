/**
 * Created by yanbiao on 10/29/15.
 */
'use strict';

var Model = require('../../../../models')
var Sequelize = require('sequelize');

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('user_timeline called');
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
        if (max_id != null && max_id != 0) {
            Status.findAll({
                where: Sequelize.and(
                    {
                        authorId:uuid
                    },
                    {
                        id:{lte:max_id}
                    }
                ),
                limit: count,
                order: 'id DESC'
            }).then(function(statuses){
                for (var status in statuses) {
                    var item = {
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
                    where: Sequelize.and(
                        {
                            authorId:uuid
                        },
                        {
                            id:{gte:since_id}
                        }
                    ),
                    limit: count,
                    order: 'id ASC'
                }).then(function(statuses){
                    console.log(statuses.length);
                    for (var i = 0; i < statuses.length; i++) {
                        var item = {
                            authorId: statuses[i].authorId,
                            title: statuses[i].title,
                            content: statuses[i].content,
                            images: statuses[i].images,
                            tag: statuses[i].tag,
                            lat: statuses[i].lat,
                            long: statuses[i].long
                        };
                        console.log(statuses[i]);
                        result.data.statuses.push(item);
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

    });
};
