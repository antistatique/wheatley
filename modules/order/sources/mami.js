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
        text: ':pizza: Envie de la *meilleure pizza napolitaine* de Lausanne ?\n📜 Pour <https://mylightspeed.app/DCMZGSUT/C-ordering/menu|voir le menu>\n:point_right: Pour <tel:+41216254848|téléphoner>'
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
}
