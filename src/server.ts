import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
// import { createEventAdapter } from '@slack/events-api';    
import Phelia from 'phelia';

import MeetingSurvey from './components/MeetingSurvey';

dotenv.config();
const app = express();
const port = 3000;
// const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
//  includeBody: true,
// })


const client = new Phelia(process.env.SLACK_TOKEN);
client.registerComponents([MeetingSurvey]);

// Register the interaction webhook
app.post(
  "/interactions",
  client.messageHandler(process.env.SLACK_SIGNING_SECRET)
);

// app.use('/slack/events', slackEvents.expressMiddleware())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const setMeetingSurvey = (channel: string) => client.postMessage(MeetingSurvey, channel);
app.post("/meeting", (req, res) => {
  res.json();
  setMeetingSurvey(req.body.channel_id);
});
// slackEvents.on('app_mention', async (event) => {
//   client.postMessage(MeetingSurvey, event.channel);
// });

// Send message to Yann G.
client.postMessage(MeetingSurvey, "U075T9LPP");

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
