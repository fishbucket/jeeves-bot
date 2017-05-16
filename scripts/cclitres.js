var fs = require('fs');
var _ = require('lodash');

var CC_JSON = __dirname + '/../data/ccliters.json';
var BASE_URL = 'https://s3.amazonaws.com/tds-slack/ccliters';

var cooksImages = JSON.parse(fs.readFileSync(CC_JSON, 'utf8'));
var tooManyRegex = /too many/i;
var cooksRegex = /ccl\s*(.*)/i;

function getCookImageURL(img) {
  return BASE_URL + '/' + img;
}

function getRandomCook() {
  return getCookImageURL(_.sample(cooksImages));
}

function findCook(name) {
  return _.find(cooksImages, function(imageName) {
    return imageName.search(name) >= 0;
  });
}

module.exports = function squadMovie(bot) {
  bot.hear(tooManyRegex, function(res) {
    res.send(getRandomCook());
  });
  bot.hear(cooksRegex, function(res) {
    if(res.match && res.match[1].length === 0) {
      return;
    }
    if(res.match && res.match[1] && res.match[1] === 'list') {
      return res.send(JSON.stringify(cooksImages,null,"\t"));
    }
    var found = findCook(res.match[1]);
    if(!_.isUndefined(found)) {
      return res.send(getCookImageURL(found));
    }
  });
};
