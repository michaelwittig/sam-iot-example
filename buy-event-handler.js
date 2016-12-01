'use strict';

const cache = require('./cache.js');

function publish(iotdata, payload) {
  return iotdata.publish({
    topic: `alert/fraud`,
    qos: 0,
    payload: JSON.stringify(payload),
  }).promise();
}

function isFraud(payload) {
  return Promise.resolve(Math.random() < 0.5); // very simple implementation :)
}

module.exports.analyze = (payload, context, cb) => {
  console.log(JSON.stringify(payload));
  isFraud()
    .then(fraud => {
      if (fraud === true) {
        return cache.iotdata
          .then((iotdata) => publish(iotdata, payload));
      } else {
        return fraud;
      }
    })
    .then(() => cb(null, {statusCode: 204}))
    .catch((err) => cb(err));
};
