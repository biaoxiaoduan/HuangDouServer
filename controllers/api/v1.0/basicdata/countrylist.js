/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var Country = Model.Country;
        var result = {'success':'ture', 'data':[]};
        Country.findAll().then(function(countries){
            for (var i = 0; i < countries.length; i++) {
                var country = countries[i];
                //console.log(country.countryName);
                var item = {'id':country.countryID, 'name':country.countryName};
                //console.log(item);
                result.data.push(item);
            }
            res.send(result);
        }).error(function(err){
            result.success = false;
            res.send(result);
        });

    });
};


