const cheerio = require('cheerio');
const axios = require('axios');

const { doc, setDoc } = require('firebase/firestore');

const { db } = require('../../../services/firebase');

module.exports = {
  ctaSection: (id, source) => [
    {
      type: 'divider'
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Dieci Lausanne Ouest',
        emoji: true
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ':pizza: Envie d\'une pizza *moins bonne que chez Mami* #traitor ?\n:point_right: Pour <https://webshop.dieci.ch/c/1/pizza|finaliser la commande>'
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
    // @TODO make it work
    // const { data: html } = await axios('https://webshop.dieci.ch/listArticle');
    // const $ = cheerio.load(html);

    // const menu = [];

    // $('.article-container').each(function() {
    //   const title = $(this).find('.article-name h2').text();
    //   const price = $(this).find('.article-price').text();
    //   const image = $(this).find('.article-image img').attr('src');
    //   menu.push({ title, price, image });
    // });

    const menu = [{
      title: "Margherita",
      price: "CHF 12.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297807/xwa06eedem8kra9xufgd.jpg"
    }, {
      title: "Stromboli",
      price: "CHF 14.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298383/czc2wlcmhzwotvec6tbr.jpg"
    }, {
      title: "Napoli",
      price: "CHF 15.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297859/uu0qt6mhhzrlgohyhizm.jpg"
    }, {
      title: "Funghi",
      price: "CHF 16.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297527/lsv6hciiwaldb6c3eexa.jpg"
    }, {
      title: "Gorgonzola",
      price: "CHF 16.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297706/aizkavrsnmejmo4isiez.jpg"
    }, {
      title: "Rucola",
      price: "CHF 16.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604404495/hgn907cfvdanunqlor0o.jpg"
    }, {
      title: "Verde",
      price: "CHF 16.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604404641/mmtn6xbb1gnykh4f2yku.jpg"
    }, {
      title: "Calzone",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297435/jywexdib2kqsnllcsje7.jpg"
    }, {
      title: "Frutti di mare",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297499/g7gwkuxvpk4i75qno0sk.jpg"
    }, {
      title: "Giardino",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297640/gy0h1m1phg3s4xztiqge.jpg"
    }, {
      title: "Hawaii",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297751/g3insayc4oyrjdlrqp8m.jpg"
    }, {
      title: "Kickiricki",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297779/p8rjexvfzo3bg2jxwly6.jpg"
    }, {
      title: "Occhio di Bue Speciale",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297887/evnythmb7coadieo4uz6.jpg"
    }, {
      title: "Ortolana",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604404388/qfixnqa8qijbunhg0bbs.jpg"
    }, {
      title: "Piccante",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297953/ayzc5ilhgegzmj9qi4on.jpg"
    }, {
      title: "Porcini",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297999/svq3rbfjyerhk5ha1qpi.jpg"
    }, {
      title: "Prosciutto",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298048/a4osuqrlktldxvxjqnjz.jpg"
    }, {
      title: "Prosciutto e funghi",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298025/u58j3xokccyjke2ermdq.jpg"
    }, {
      title: "Quattro stagioni",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298127/s7ctkpj5lxvyugvqcf4x.jpg"
    }, {
      title: "Rustica",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298257/o1ysncmqgh2zgx8q18bb.jpg"
    }, {
      title: "Salame",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298291/lm2qxxrjaayl0zqij83j.jpg"
    }, {
      title: "Salsiccia Bianca",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1629698849/ekzhknjqatn3zuv6cczr.jpg"
    }, {
      title: "Trenta",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1618900226/yv5tkgkm4lkjqaalve3b.jpg"
    }, {
      title: "Tonno",
      price: "CHF 17.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298405/jqn55qi04wr3mtdwhxvv.jpg"
    }, {
      title: "Gamberetti",
      price: "CHF 18.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297605/ya2px9fah0zcpiybkpzw.jpg"
    }, {
      title: "Padrone",
      price: "CHF 18.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297931/bu4ne8zlqoy6lyp9a0ig.jpg"
    }, {
      title: "Quattro formaggi",
      price: "CHF 18.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604298094/yp5lvncicprzvriquopc.jpg"
    }, {
      title: "Dieci",
      price: "CHF 20.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297465/i0y8xwksivzdfutxezoy.jpg"
    }, {
      title: "Auguri",
      price: "CHF 22.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604297227/tgdqgo66pnjvnpuol6pj.jpg"
    }, {
      title: "Salmone Bianca",
      price: "CHF 22.00",
      image: "https://res.cloudinary.com/hbskgqlkj/image/upload/w_500,h_350,c_fit,/v1604565027/dfi4zw4avglcpzluwtk3.jpg"
    }];

    if (menu.length > 0) {
      try {
        await setDoc(doc(db, 'menus', 'dieci'), {
          updatedAt: new Date(),
          menu
        });
      } catch (e) {
        console.error("Error updating menu: ", e);
      }
    }
  },
}