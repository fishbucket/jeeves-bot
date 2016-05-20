var fs = require('fs');
var _ = require('lodash');

var BASE_URL = 'https://s3.amazonaws.com/spokestyle';
var NUM_IMAGES = 123;
var BASE_IMG_NAME = 'style_';
var NUM_BOMBS = 5;

function getRandomStyle() {
  var randomStyleIdx = _.random(NUM_IMAGES) + 1;
  return BASE_URL + '/' + BASE_IMG_NAME + randomStyleIdx + '.JPG';
}

function sendStyle(res) {
  return res.send(getRandomStyle());
}


module.exports = function stylebomb(bot) {

  bot.hear(/style\s*bomb/i, function(res) {
    _.times(NUM_BOMBS, _.partial(sendStyle, res));
  });

  bot.hear(/style\s*me/i, sendStyle);

};
