const { App, LogLevel } = require('@slack/bolt');
const { WebClient, LogLevel: LogLevelClient } = require('@slack/web-api');

const order = require('./modules/order');
const kudo = require('./modules/kudo');

require('dotenv').config();

const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  logLevel: LogLevelClient.DEBUG
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});
module.exports.app = app;

order.register(app);
kudo.register(app, client);


(async () => {
  await app.start(process.env.PORT || 9090);

  console.log('⚡️ Bolt app is running!');
})();
