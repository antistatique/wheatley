const { collection, getDocsFromServer } = require('firebase/firestore');
const { getWeek, getYear} = require("date-fns");

const { db } = require('../../services/firebase');

module.exports = async ({ ack, payload, client }) => {
  await ack();

  const ref = collection(db, 'kudos-logs');
  const snapshot = await getDocsFromServer(ref);

  const weeks = {};
  snapshot.forEach(doc => {
    const date = doc.data().date.toDate();
    weeks[`${getYear(date)}-${getWeek(date).toString().padStart(2, '0')}`] = (weeks[`${getYear(date)}-${getWeek(date)}`] ?? 0) + (doc.data().amount ?? 1);
  });

  const yearsCheck = {};

  await client.chat.postMessage({
    channel: payload.channel_id,
    blocks: [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Voici le nombre de :kudo: donnés par semaine",
          "emoji": true
        }
      },
      ...Object.keys(weeks).sort().reverse().reduce((acc, week) => {
        const year = week.split('-')[0];
        const weekNbr = week.split('-')[1];
        const isYearChecked = yearsCheck[year] !== undefined;

        const yearRows = [
          {
            type: 'divider'
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*${year}*`
            }
          }
        ];

        const weekRow = {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `semaine ${weekNbr} : *${weeks[week]}* :kudo:`
          }
        };

        if (!isYearChecked) {
          yearsCheck[year] = true;
          return [ ...acc, ...yearRows, weekRow ]
        }

        return [ ...acc, weekRow ]
      }, []),
    ],
  });
};
