const cheerio = require('cheerio');
const axios = require('axios');

const { doc, setDoc } = require('firebase/firestore');

const { db } = require('../../../services/firebase');

module.exports = {
  ctaSection: (id, source) => [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Mami Pizza',
        emoji: true
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ':pizza: Envie de la *meilleure pizza napolitaine* de Lausanne ?\n:point_right: Pour <tel:+41216254848|finaliser la commande>'
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Passe ta commande !'
        },
        style: 'primary',
        action_id: 'open_order_modal',
        value: JSON.stringify({
          id,
          source
        })
      }
    }
  ],

  populateMenu: async () => {
    const { data } = await axios('https://api.wixrestaurants.com/v2/organizations/5468348042963155/menu?locationId=e4b191c7-3247-4883-b49d-8f1a6221fb76');

    const menu = data?.items
      ?.filter(i => i.price > 1250)
      ?.map(i => ({
        title: i.title?.fr_CH,
        price: `CHF ${i.price / 100}`,
        image: i.media?.logo ?? 'https://i.imgur.com/WKY0YcT.png',
      }))
      ?.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else {
          return 0;
        }
      });

    if (menu.length > 0) {
      try {
        await setDoc(doc(db, 'menus', 'mami'), {
          updatedAt: new Date(),
          menu
        });
      } catch (e) {
        console.error("Error updating menu: ", e);
      }
    }
  },
}
