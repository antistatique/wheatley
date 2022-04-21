const cheerio = require('cheerio');
const axios = require('axios');

const { doc, setDoc } = require('firebase/firestore');

const { db } = require('../../../services/firebase');

module.exports = {
  ctaSection: (id, source) => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: ':pizza: Envie de la meilleure pizza napolitaine de Lausanne ?\nPour commander :point_right: 021 625 48 48'
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Passe ta commande !'
      },
      action_id: 'open_order_modal',
      value: JSON.stringify({
        id,
        source
      })
    }
  }),

  populateMenu: async () => {
    const { data: html } = await axios('https://www.mamipizza.ch/shop');
    const $ = cheerio.load(html);

    const menu = [];

    $('[data-hook="product-list-grid-item"]').each(function() {
      const title = $(this).find('h3').text();
      const price = $(this).find('[data-hook="product-item-price-to-pay"]').text();
      const image = $(this).find('[data-hook="product-item-images"]').attr('style').replace('background-image:url(', '').replace(');background-size:contain', '').replace('w_100,h_100', 'w_300,h_300');

      // Pas fou
      if (!title.toLowerCase().includes('salade')) {
        menu.push({ title, price, image });
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