const R = require('ramda');

const distribute = require('./distribute');
const myTotal = require('./myTotal');
const weeklyTotal = require('./weeklyTotal');

module.exports.register = (app) => {
  app.message(':kudo:', distribute);
  app.command('/mykudos', myTotal);
  app.command('/weeklykudos', weeklyTotal);
};
