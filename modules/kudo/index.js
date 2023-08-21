const R = require('ramda');

const distribute = require('./distribute');
const reaction = require('./reaction');
const myTotal = require('./myTotal');
const weeklyTotal = require('./weeklyTotal');

module.exports.register = (app) => {
  app.message(':kudo:', distribute);
  app.message(':taco:', distribute);
  app.command('/mykudos', myTotal);
  app.command('/weeklykudos', weeklyTotal);
  app.event('reaction_added', reaction);
};
