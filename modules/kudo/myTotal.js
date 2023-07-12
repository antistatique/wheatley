const { doc, setDoc, getDoc} = require('firebase/firestore');
const { nanoid } = require('nanoid');

const { db } = require('../../services/firebase');

module.exports = async ({ ack, payload, client }) => {
  await ack();

  const kudoRef = doc(db, 'kudos-total', payload.user_id);
  const kudoSnap = await getDoc(kudoRef);

  let total = 0;
  if (kudoSnap.exists()) total = kudoSnap.data().total;

  await client.chat.postMessage({
    channel: payload.channel_id,
    text: `<@${payload.user_id}> Tu as reçu *${total}* kudos en tout !`
  });
};
