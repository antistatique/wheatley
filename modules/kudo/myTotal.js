const { doc, setDoc, getDoc} = require('firebase/firestore');
const { nanoid } = require('nanoid');

const { db } = require('../../services/firebase');

module.exports = async ({ ack, payload, client }) => {
  await ack();

  const kudoRef = doc(db, 'kudos-total', payload.user_id);
  const kudoSnap = await getDoc(kudoRef);

  let data = {};
  if (kudoSnap.exists()) data = kudoSnap.data();

  await client.chat.postMessage({
    channel: payload.channel_id,
    text: `<@${payload.user_id}> Donné *${data.given}* :kudo: | Reçu *${data.total}* :kudo:`
  });
};
