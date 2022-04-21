const { doc, setDoc } = require('firebase/firestore');
const { nanoid } = require('nanoid');

const { db } = require('../../services/firebase');
const sources = require('./sources');

module.exports = async ({ ack, payload, context, client }) => {
  ack();

  const id = nanoid();

  let source = payload.text;
  if (!Object.keys(sources).includes(source)) source = 'unknown';

  try {
    const { channel, ts } = await client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks: [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: ':loading: Récupération du menu en cours...'
        },
      }],
      text: 'Récupération du menu en cours'
    });

    if (source !== 'unknown') await sources[source].populateMenu();

    await client.chat.update({
      token: context.botToken,
      channel,
      ts,
      blocks: [...sources[source].ctaSection(id, source)],
      text: 'Passe ta commande'
    });

    try {
      await setDoc(doc(db, 'orders', id), {
        createdAt: new Date(),
        id,
        channel,
        ts,
        source,
        order: {}
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } catch (error) {
    console.error(error);
  }
};