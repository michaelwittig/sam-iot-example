'use strict';

const uuid = require('uuid');
const cache = require('./cache.js');

function publish(iotdata, payload) {
  return iotdata.publish({
    topic: `event/${payload.type}`,
    qos: 0,
    payload: JSON.stringify(payload),
  }).promise();
}

module.exports.create = (event, context, cb) => {
  console.log(JSON.stringify(event));
  try {
    var payload = JSON.parse(event.body); // safely parse body JSON
  } catch(err) {
    cb(null, {statusCode: 400});
    return;
  }
  if (payload.id === undefined || payload.id === null) {
    payload.id = uuid.v4(); // assign id if no id was passed in
  }
  if (payload.type === undefined || payload.type === null) {
    cb(null, {statusCode: 400});
  } else {
    cache.iotdata
      .then((iotdata) => publish(iotdata, payload))
      .then(() => cb(null, {statusCode: 204}))
      .catch((err) => cb(err));
  }
};
