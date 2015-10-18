/**
 * Created by yanbiao on 10/15/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        //var mobileContactList = req.body.mobileContact;
        var weiboContactList = req.body.weiboContact;
        var result = {
            success:true, error:'',
            data:{
            }
        };
        result = [];
        var User = Model.User;
        User.all().then(function(users){
            for (var i = 0; i < user.length; i++) {
                for (var j = 0; j < weiboContactList.length; j++) {
                    var weiboId = weiboContactList[i];
                    if (weiboId == user.uid) {
                        var item = {'uuid':user.uuid, 'username':user.username};
                        console.log(item);
                        result.append(item);
                    }
                }
                result.data.result = result;
                res.send(result);
            }
        });
    });
};


