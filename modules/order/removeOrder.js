const { doc, getDoc, setDoc } = require('firebase/firestore');
const R = require('ramda');

const { db } = require('../../services/firebase');
const updateMessage = require('./updateMessage');

module.exports = async ({ ack, body, context, client }) => {
  await ack();

  const { name, id, key: title } = JSON.parse(body.actions[0].value);
  const docRef = doc(db, 'orders', id);
  const docSnap = await getDoc(docRef);


  if (docSnap.exists()) {
    const { channel, ts, createdAt, source, order } = docSnap.data();
    const updatedDoc = {
      channel,
      ts,
      id,
      source,
      createdAt,
      updatedAt: new Date(),
      order: Object.keys(order[title]?.people).length > 1
        ? {
          ...order,
          [title]: {
            ...order[title],
            people: R.omit([name], order[title]?.people)
          }
        }
        : R.omit([title], order)
    };

    await setDoc(docRef, updatedDoc);

    await updateMessage({
      id,
      client,
      title,
      price: order[title]?.price,
      token: context.botToken,
      updatedDoc
    });
  }
}
