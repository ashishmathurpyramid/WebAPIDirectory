'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.getWebAPIGET = function getWebAPIGET (req, res, next, webAPIName) {
  Default.getWebAPIGET(webAPIName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.Message,response.Status);
    });
};
