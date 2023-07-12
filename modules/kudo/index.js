const R = require('ramda');

const distribute = require('./distribute');

module.exports.register = (app, client) => {
  app.message(':kudo:', options => distribute(options, client));
};
