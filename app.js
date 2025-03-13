const { App, LogLevel } = require('@slack/bolt');

const order = require('./modules/order');
const kudo = require('./modules/kudo');

require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.INFO,
});
module.exports.app = app;

order.register(app);
kudo.register(app);


(async () => {
  await app.start(process.env.PORT || 9090);

  console.log('⚡️ Bolt app is running!');
})();
