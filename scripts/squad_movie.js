var fs = require('fs');
var _ = require('lodash');

var MOVIES_JSON = __dirname + '/../data/squad_movies.json';

var queryTemplate = _.template('http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=<%= title %>');
var movies = JSON.parse(fs.readFileSync(MOVIES_JSON, 'utf8'));
var movieRegex = /squad movie/i;

function _onMovieSuccess(bot, res, err, httpRes, body) {
  var movieData;

  if(err) {
    return res.send('Could not query movie: ' + err.message);
  }
  try {
    movieData = JSON.parse(body);
  } catch(ex) {
    return res.send('Could not parse JSON: ' + err.message);
  }
  if(movieData.title_popular && _.isArray(movieData.title_popular)) {
    movieData = movieData.title_popular[0];
    return res.send("Random Squad Movie: <a href=\"http://www.imdb.com/title/" + movieData.id + "\">" + movieData.title  + "</a>");
  }
  res.send('done');
}

module.exports = function squadMovie(bot) {
  bot.hear(movieRegex, function(res) {
    var randomMovieTitle = _.sample(movies);
    var onMovieSuccess = _.partial(_onMovieSuccess, bot, res);
    var uri = encodeURI(queryTemplate({ title: randomMovieTitle }));
    bot.http(uri).get()(onMovieSuccess);
  });
};
