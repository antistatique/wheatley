const init = require('./init');
const modal = require('./modal');
const order = require('./order');
const payOrder = require('./payOrder');
const removeOrder = require('./removeOrder');

module.exports.register = (app) => {
  app.command('/order', init);
  app.action('open_order_modal', modal);
  app.action('add_order', order);
  app.action('pay_order', payOrder);
  app.action('remove_order', removeOrder);
};
