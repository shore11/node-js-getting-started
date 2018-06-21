const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRates', (req, res) => {
    var weight = Number(req.query.weight);
    var type = req.query.type;

    calculateRate(res, weight, type);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function calculateRate(res, weight, type){
    var map = new Map();  // map for letters
    map.set(1, 0.50);
    map.set(2, 0.71);
    map.set(3, 0.92);
    map.set(3.5, 1.13);

    var map2 = new Map(); // map for letterm
    map2.set(1, 0.47);
    map2.set(2, 0.68);
    map2.set(3, 0.89);
    map2.set(3.5, 1.10);

    var map3 = new Map(); // map for largeEnvelopes 
    map3.set(1, 1.00);
    map3.set(2, 1.21);
    map3.set(3, 1.42);
    map3.set(4, 1.63);
    map3.set(5, 1.84);
    map3.set(6, 2.05);
    map3.set(7, 2.26);
    map3.set(8, 2.47);
    map3.set(9, 2.68);
    map3.set(10, 2.89);
    map3.set(11, 3.10);
    map3.set(12, 3.31);
    map3.set(13, 3.52);

    var map4 = new Map(); // map for firstClass
    map4.set(1, 3.50);
    map4.set(2, 3.50);
    map4.set(3, 3.50);
    map4.set(4, 3.50);
    map4.set(5, 3.75);
    map4.set(6, 3.75);
    map4.set(7, 3.75);
    map4.set(8, 3.75);
    map4.set(9, 4.10);
    map4.set(10, 4.45);
    map4.set(11, 4.80);
    map4.set(12, 5.15);
    map4.set(13, 5.50);

    var price = 0;
    switch(type){
      case 'letters':
        if (weight > 3.5){
          price = 4.00;
        } else {
          price = map.get(weight);
        }
      break;
      case 'letterm':
        if(weight > 3.5){
          price = 4.00;
        } else {
          price = map2.get(weight);
        }
      break;
      case 'largeEnvelopes':
        if(weight > 13){
          price = 4.00;
        } else {
          price = map3.get(weight);
        }
      break;
      case 'firstClass':
        if(weight > 13) {
          price = 6.00
        } else {
          price = map.get(weight);
        }
    }
    console.log(price);
       


    res.render('pages/results');
  }