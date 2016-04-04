var t_dot_img = 'http://i.imgur.com/8jOwJdN.jpg';

function tDotMe(bot) {
  bot.respond(/tdot me/i, function(res) {
    res.send(t_dot_img);
  });
}

module.exports = tDotMe;
