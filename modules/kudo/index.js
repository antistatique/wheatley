const R = require('ramda');

const distribute = require('./distribute');

module.exports.register = (app) => {
  app.message(':kudo:', distribute);
};
