var fs = require('fs');
var _ = require('lodash');

var MOVIES_JSON = __dirname + '/../data/squad_movies.json';

var queryTemplate = _.template('http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=<%= title %>');
var outputTemplate = _.template('<%= title %> - http://imdb.com/title/<%= id %>');

var movies = JSON.parse(fs.readFileSync(MOVIES_JSON, 'utf8'));
var movieRegex = /squad movie/i;

function _onMovieSuccess(bot, res, err, httpRes, body) {
  var movieData, imdbKey;
  var keysToCheck = ['title_exact', 'title_popular', 'title_substring'];

  if(err) {
    return res.send('Could not query movie: ' + err.message);
  }
  try {
    movieData = JSON.parse(body);
  } catch(ex) {
    return res.send('Could not parse JSON: ' + err.message);
  }
  imdbKey = _.find(keysToCheck, function(key) {
    return movieData[key] && _.isArray(movieData[key]);
  });
  if(_.isUndefined(imdbKey)) {
    return res.send('Could not find match for movie');
  }
  movieData = movieData[imdbKey][0];
  return res.send(outputTemplate(movieData));
}

module.exports = function squadMovie(bot) {
  bot.hear(movieRegex, function(res) {
    var randomMovieTitle = _.sample(movies);
    var onMovieSuccess = _.partial(_onMovieSuccess, bot, res);
    var uri = encodeURI(queryTemplate({ title: randomMovieTitle }));
    bot.http(uri).get()(onMovieSuccess);
  });
};
