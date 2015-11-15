'use strict';

var crypto = require('crypto');
var Model = require('../../../../models')

module.exports = function (router) {

    //var model = new IndexModel();

    router.get('/', function (req, res) {
        //console.log(req);
        res.send('login');
    });

    router.post('/', function (req, res) {
        var method = req.body.method;
        var uuid = '';
        console.log(req.body);
        if (method == 'sdk') {
            // generate information
            var source = req.body.source;
            var uid = req.body.uid;
            var content = source + uid;
            var md5 = crypto.createHash('md5');
            md5.update(content);
            uuid = md5.digest('hex');
            var params = {
                newUser: false,
                uuid: uuid
            };
            var result = {
                success: 'false',
                data: params
            }
            // check if the user exist
            var User = Model.User;
            User.find({where: {guid: uuid}}).then(function(users){
                if (users == null) {
                    result.data.newUser = true;
                    var newUser = User.build({
                        username: uuid,
                        source: source,
                        uid: uid,
                        guid: uuid
                    });
                    newUser.save().error(function(anotherTask) {
                        // you can now access the currently saved task with the variable anotherTask... nice!
                        result.success = false;
                        res.send(result);
                    }).then(function onSuccess(shit) {
                        result.success = true;
                        res.send(result);
                    });
                } else {
                    result.success = true;
                    console.log('Existing user');
                    res.send(result);
                }
            });
        } else if (method == 'sms') {
        }
    });
};


