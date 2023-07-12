const R = require('ramda');
const { nanoid } = require('nanoid');
const { format } = require('date-fns');
const { doc, setDoc, getDoc } = require('firebase/firestore');

const { db } = require('../../services/firebase');

module.exports = async ({ message, say }, client) => {
  const targets = R.uniq(message.blocks[0].elements[0].elements.filter(i => i.type === 'user').map(i => i.user_id));

  const userFrom = await client.users.info({ user: message.user });

  // Handle limit
  const dayId = format(new Date(), 'yyyy.MM.dd');
  const limitRef = doc(db, 'kudos-daily-limits', dayId);
  const limitSnap = await getDoc(limitRef);
  let currentLimit = 6; // 6 - 1 = 5 ^^'
  let previousData = {};
  if (limitSnap.exists()) {
    previousData = limitSnap.data();
    currentLimit = limitSnap.data()?.[message.user];
  }

  if (currentLimit > targets.length) {
    // Update/decrement daily limit
    await setDoc(
      doc(db, 'kudos-daily-limits', dayId),
      {
        ...previousData,
        [message.user]: currentLimit - targets.length
      }
    );

    // Handle all kudos attributions
    const increments = targets.map(async (user) => {
      if (user !== message.user || true) {
        const userTo = await client.users.info({ user });

        const kudoRef = doc(db, 'kudos-total', user);
        const kudoSnap = await getDoc(kudoRef);

        let currentTotal = 0;
        if (kudoSnap.exists()) currentTotal = kudoSnap.data().total;

        await setDoc(
          doc(db, 'kudos-total', user),
          {
            total: currentTotal + 1,
            name: userTo.user.real_name
          }
        );

        // Update stats
        const id = nanoid();
        await setDoc(
          doc(db, 'kudos-logs', id),
          {
            from: userFrom.user.real_name,
            to: userTo.user.real_name,
            date: new Date(),
            message: message.text
          }
        );
      } else {
        await say(`Coquinou, tu ne peux pas d'auto-donner des kudos <@${message.user}> 😅`);
      }
    });

    await Promise.allSettled(increments);
  } else {
    await say(`Tu n'as pas assez de kudos en stock <@${message.user}> 🤷`);
  }

};
