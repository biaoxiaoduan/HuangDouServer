'use strict';

//var IndexModel = require('../models/index');


module.exports = function (router) {

    //var model = new IndexModel();

    router.get('/', function (req, res) {
        res.send('<h1>Hello world</h1>');
    });

};
