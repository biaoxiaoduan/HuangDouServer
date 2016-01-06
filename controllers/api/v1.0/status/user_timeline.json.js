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
            errorCode: 0,
            max_id: 0,
            min_id: 0,
            data:{
                list:[]
            }
        };
        var Status = Model.Status;
        if (uuid == null) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
            return;
        }
        if (count == null || count > 20 || count < 1) {
            count = 20;
        }
        var condition = {};
        if (max_id != null && max_id >= 0) {
            if (max_id == 0) {
                condition = {
                    where: Sequelize.and(
                        {
                            authorId:uuid
                        }
                    ),
                    limit: count,
                    order: 'id DESC'
                };
            } else {
                condition = {
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
                };
            }
        } else if (since_id != null && since_id != 0) {
            condition = {
                where: Sequelize.and(
                    {
                        authorId:uuid
                    },
                    {
                        id:{gte:since_id}
                    }
                ),
                    limit: count,
                order: 'id DESC'
            }
        } else {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
            return;
        }
        Status.findAll(condition).then(function(statuses){
            for (var i = 0; i < statuses.length; i++) {
                var status = statuses[i];
                var item = {
                    statusId: status.id,
                    authorId: status.authorId,
                    title: status.title,
                    content: status.content,
                    images: status.images,
                    tag: status.tag,
                    lat: status.lat,
                    long: status.long,
                    type: status.type
                };
                result.data.list.push(item);
            }
            result.data.min_id = statuses[statuses.length - 1].id;
            result.data.max_id = statuses[0].id;
            result.data.count = statuses.length;
            res.send(result);
        }).error(function(error){
            result.success = false;
            res.send(result);
        });
    });
};
