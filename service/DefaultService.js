'use strict';
const Directory = require('./Directory')
/**
 * Add a new product inventory at product/category/option level
 *
 * webAPIName String Name of the web api
 * returns WebAPI
 **/
exports.getWebAPIGET = function(webAPIName) {
  return new Promise(function(resolve, reject) {
    let webAPIAddress = Directory.WebAPIDirectory[webAPIName];
    console.log(webAPIName);
    if (typeof(webAPIAddress)=='undefined') {
      reject({'Message':'Web API Not Found', 'Status':404});
    }
    else {
      resolve(webAPIAddress);
    }
  });
}