'use strict';

const AWS = require('aws-sdk');

const iotApiVersion = '2015-05-28';
const iot = new AWS.Iot({
  apiVersion: iotApiVersion
});

module.exports.iotdata = new Promise((resolve, reject) => {
  iot.describeEndpoint({}, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(new AWS.IotData({
        apiVersion: iotApiVersion,
        endpoint: data.endpointAddress
      }));
    }
  });
});
