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
          private_metadata: JSON.stringify({
            id,
          }),
          title: {
            type: 'plain_text',
            text: `Commande “${source}”`
          },
          "submit": {
            "type": "plain_text",
            "text": "Envoyer",
            "emoji": true
          },
          blocks: [
            {
              "block_id": "name",
              "type": "input",
              "element": {
                "type": "plain_text_input",
                "action_id": "add"
              },
              "label": {
                "type": "plain_text",
                "text": "Pizza",
                "emoji": true
              }
            },
            {
              "block_id": "price",
              "type": "input",
              "element": {
                "type": "plain_text_input",
                "action_id": "add"
              },
              "label": {
                "type": "plain_text",
                "text": "Prix (en CHF)",
                "emoji": true
              }
            },
          ],
        }
      });
    } catch (error) {
      console.error('modal error', error);
    }
  }
}