const { doc, getDoc } = require('firebase/firestore');

const { db } = require('../../services/firebase');

module.exports = async ({ ack, body, client }) => {
  await ack();

  const { id, source } = JSON.parse(body.actions[0].value);
  const docRef = doc(db, 'menus', source);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const { menu } = docSnap.data();

    try {
      const result = await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'order_modal',
          title: {
            type: 'plain_text',
            text: `Commande “${source}”`
          },
          blocks: [
            ...menu.slice(0, 50).reduce((acc, { price, title, image }) => [
              ...acc,
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*${title}*\n${price}`
                },
                accessory: {
                  type: 'image',
                  image_url: image,
                  alt_text: title
                }
              },
              {
                type: 'actions',
                elements: [{
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Commander :all-the-things:',
                    emoji: true
                  },
                  value: JSON.stringify({
                    id,
                    title,
                    price
                  }),
                  action_id: `add_order`
                }]
              },
            ], [])
          ],
        }
      });
    } catch (error) {
      console.error('modal error', error);
    }
  }
}