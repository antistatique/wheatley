module.exports = async ({ event, client }) => {
  if (event.reaction === 'kudo') {
    console.log('event', JSON.stringify(event, null, 2));
    const conversation =  await client.conversations.open({
      users: event.user
    });
    await client.chat.postMessage({
      channel: conversation.channel.id,
      text: `C'est sympa de vouloir donner un :kudo: à <@${event.item_user}> avec une réaction, mais pour pouvoir valider ce :kudo:, tu dois lui joindre un petit message (p.ex. \`Merci pour ton super travail <@${event.item_user}> :kudo:\`). Ça lui fera super plaisir 😘 !`
    });
  }
};
