const { doc, getDoc, setDoc } = require('firebase/firestore');

const { db } = require('../../services/firebase');
const updateMessage = require('./updateMessage');

module.exports = async ({ ack, body, context, client}) => {
  await ack();

  const { id, title, price } = JSON.parse(body.actions[0].value);
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
      order: {
        ...order,
        [title]: {
          price,
          people: {
            [body.user.username]: false,
            ...order[title]?.people,
          }
        }
      }
    };

    await setDoc(docRef, updatedDoc);

    await updateMessage({
      id,
      client,
      title,
      price,
      token: context.botToken,
      updatedDoc
    })
  }  
}