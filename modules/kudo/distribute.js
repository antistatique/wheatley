const R = require('ramda');
const { nanoid } = require('nanoid');
const { count } = require('ramda');
const { format } = require('date-fns');
const { doc, setDoc, getDoc } = require('firebase/firestore');

const { db, getData } = require('../../services/firebase');

module.exports = async ({ message, say, client }) => {
  const targets = R.uniq(message.blocks[0].elements[0].elements.filter(i => i.type === 'user').map(i => i.user_id));
  const amount = count(i => i.name === 'kudo', message.blocks[0].elements[0].elements);
  const totalToGive = amount * targets.length;

  // Get sender informations
  const sender = await client.users.info({ user: message.user });
  const senderData = await getData('kudos-total', message.user);

  // Handle limit
  const dayId = format(new Date(), 'yyyy.MM.dd');
  const dailyLimits = await getData('kudos-daily-limits', dayId);
  const currentLimit = dailyLimits?.[message.user] ?? 6; // 6 - 1 = 5 ^^'

  if (currentLimit > totalToGive) {
    // Update/decrement daily limit for sender
    await setDoc(
      doc(db, 'kudos-daily-limits', dayId),
      {
        ...dailyLimits,
        [message.user]: currentLimit - totalToGive
      }
    );

    // Increment given
    await setDoc(
      doc(db, 'kudos-total', message.user),
      {
        ...senderData,
        given: (senderData.given ?? 0) + totalToGive,
        name: sender.user.real_name
      }
    );

    // Handle all kudos attributions
    const increments = targets.map(async (target) => {
      if (target !== message.user) {
        const receiver = await client.users.info({ user: target });
        const receiverData = await getData('kudos-total', target);

        await setDoc(
          doc(db, 'kudos-total', target),
          {
            ...receiverData,
            total: (receiverData.total ?? 0) + amount,
            name: receiver.user.real_name
          }
        );

        // Update stats
        const id = nanoid();
        await setDoc(
          doc(db, 'kudos-logs', id),
          {
            from: sender.user.real_name,
            to: receiver.user.real_name,
            date: new Date(),
            message: message.text,
            amount
          }
        );

        const conversation =  await client.conversations.open({
          users: target
        });
        await client.chat.postMessage({
          channel: conversation.channel.id,
          text: `Tu as reçu *${amount}* :kudo: de <@${message.user}> dans <#${message.channel}> !`
        });
      } else {
        await say(`Coquinou, tu ne peux pas d'auto-donner des :kudo: <@${message.user}> 😅`);
      }
    });

    await Promise.allSettled(increments);
  } else {
    await say(`Tu n'as pas assez de :kudo: en stock <@${message.user}> 🤷`);
  }

};
