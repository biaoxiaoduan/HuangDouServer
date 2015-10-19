/**
 * Created by yanbiao on 10/15/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        //var mobileContactList = req.body.mobileContact;
        var weibo = JSON.parse(req.body.weibo);
        var uuid = req.body.uuid;
        //console.log(weibo);
        var result = {
            success: true, error: '',
            data: []
        };
        var telArray = ['18611712493', '15210503191', '18618177787', '18600514081', '18801222804', '15120049755', '13320208080'];
        var User = Model.User;
        var RelationShip = Model.Relationship;
        User.all().then(function (users) {
            RelationShip.findAll({where: {member1: uuid}}).then(function (relations) {
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    for (var j = 0; j < telArray.length; j++) {
                        if (telArray[j] == user.telNum && user.guid != uuid) {
                            var exist = false;
                            for (var k = 0; k < relations.length; k++) {
                                console.log(relations[k].member2);
                                if (relations[k].member2 == user.guid) {
                                    exist = true;
                                    break;
                                }
                            }
                            if (!exist) {
                                var item = {'uuid': user.guid, 'username': user.username};
                                result.data.push(item);
                            }
                        }
                    }
                    //for (var j = 0; j < weibo.length; j++) {
                    //    var weiboId = weibo[j];
                    //    if (weiboId == users[i].uid) {
                    //        var exist = false;
                    //        for (var k = 0; k < relations.length; k++) {
                    //            if (relations[k].member2 == users[i].guid) {
                    //                exist = true;
                    //                break;
                    //            }
                    //        }
                    //        if (!exist) {
                    //            var item = {'uuid': users[i].guid, 'username': users[i].username};
                    //            console.log(item);
                    //            result.data.push(item);
                    //        }
                    //    }
                    //}
                }
                res.send(result);
            });

        });
    });
};


