/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var countryID = req.query.countryID;
        var City = Model.City;
        var result = {'success': true, 'data': []};
        City.findAll({where: {countryID: countryID}}).then(function (cities) {
            for (var i = 0; i < cities.length; i++) {
                var city = cities[i];
                var item = {'id': city.cityID, 'name': city.cityName};
                result.data.push(item);
            }
            res.send(result);
        }).error(function (err) {
            result.success = false;
            res.send(result);
        });
    });
};


