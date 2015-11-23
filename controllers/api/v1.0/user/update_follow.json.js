/**
 * Created by yanbiao on 11/23/15.
 */
'use strict';

var Model = require('../../../../models')
var async = require('async')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var RelationShip = Model.Relationship;
        var User = Model.User;
        RelationShip.findAll({
        }).then(function (relationships) {
            async.eachSeries(relationships, function(relation, callback){
                //var follower = relation.member1;
                //User.find({
                //    where:{
                //        guid:follower
                //    }
                //}).then(function(user){
                //    user.updateAttributes({
                //        following: user.following+1
                //    }).then(function(){
                //        callback();
                //    });
                //});
                var followee = relation.member2;
                User.find({
                    where:{
                        guid:followee
                    }
                }).then(function(user){
                    user.updateAttributes({
                        follower: user.follower+1
                    }).then(function(){
                        callback();
                    });
                });
            })
        }).error(function(error){
            res.send('');
        });
    });
};
