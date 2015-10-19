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
            success:true, error:'',
            data:[]
        };
        var User = Model.User;
        var RelationShip = Model.Relationship;
        User.all().then(function(users){
            RelationShip.findAll({where:{member1:uuid}}).then(function(relations) {
                console.log(relations);
                for (var i = 0; i < users.length; i++) {
                    for (var j = 0; j < weibo.length; j++) {
                        var weiboId = weibo[j];
                        if (weiboId == users[i].uid) {
                            var exist = false;
                            for (var k = 0; k < relations.length; k++) {
                                if (relations[k].member2 == users[i].guid) {
                                    exist = true;
                                    break;
                                }
                            }
                            if (!exist) {
                                var item = {'uuid': users[i].guid, 'username': users[i].username};
                                console.log(item);
                                result.data.push(item);
                            }
                        }
                    }
                }
                res.send(result);
        });

        });
    });
};


