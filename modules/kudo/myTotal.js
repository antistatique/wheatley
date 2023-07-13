const { doc, setDoc, getDoc} = require('firebase/firestore');
const { nanoid } = require('nanoid');

const { db, getData} = require('../../services/firebase');

module.exports = async ({ ack, payload, client }) => {
  await ack();

  const data = await getData('kudos-total', payload.user_id);

  await client.chat.postMessage({
    channel: payload.channel_id,
    text: `<@${payload.user_id}> Donnés *${data.given}* :kudo: | Reçus *${data.total}* :kudo:`
  });
};
