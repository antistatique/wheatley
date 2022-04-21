const sources = require('./sources');

module.exports = async ({ id, client, token, title, price, updatedDoc }) => {
  const { channel, ts, source, order } = updatedDoc;

  try {
    const result = await client.chat.update({
      token,
      channel,
      ts,
      blocks: [
        sources[source].ctaSection(id, source),
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'La commande',
            emoji: true
          }
        },
        {
          type: 'divider'
        },
        ...Object.keys(order).sort().reduce((acc, key) => [
          ...acc,
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*[${Object.keys(order[key].people).length}] ${key}*`
            }
          },
          ...Object.keys(order[key].people).reduce((peopleAcc, name) => [
            ...peopleAcc,
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `${order[key].people[name] ? ':white_check_mark:' : ':arrows_counterclockwise:'} @${name} - ${order[key].price}`
              },
              accessory: {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: order[key].people[name] ? "À payer" : "C'est payé !",
                  emoji: true
                },
                value: JSON.stringify({
                  name,
                  key,
                  id,
                  price,
                }),
                action_id: 'pay_order'
              }
            },
          ], []),
          {
            type: 'divider'
          }
        ], []),
      ],
      text: 'Mise à jour du message de commande'
    });
  } catch (error) {
    console.error(error);
  }
}