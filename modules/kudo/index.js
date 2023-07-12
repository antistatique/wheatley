const R = require('ramda');

const distribute = require('./distribute');
const myTotal = require('./myTotal');

module.exports.register = (app) => {
  app.message(':kudo:', distribute);
  app.command('/mykudos', myTotal);
};
