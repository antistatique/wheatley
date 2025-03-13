const { doc, getDoc, setDoc } = require('firebase/firestore');
const { nanoid } = require('nanoid');
const { db } = require('../../services/firebase');
const updateMessage = require('./updateMessage');

module.exports = async ({ ack, body, view, client, context }) => {
  await ack();

  const title = body.view.state.values.name.add.value;
  const price = body.view.state.values.price.add.value;
  const { id } = JSON.parse(view.private_metadata);

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