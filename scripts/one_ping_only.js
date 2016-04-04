var _ = require('lodash');

var pings = [
  'https://camo.githubusercontent.com/aab6b35cbb3181180752c17a2c81f3990b22ce47/68747470733a2f2f646c2e64726f70626f7875736572636f6e74656e742e636f6d2f752f33333835342f6f6e6570696e676f6e6c792e676966',
  'http://i.imgur.com/7UhgyPS.gif',
  'http://cdn.makeagif.com/media/9-28-2015/jfNIYM.gif'
];

function onePingOnly(bot) {
  bot.hear(/one ping only/i, function(res) {
    res.send(_.sample(pings));
  });
}

module.exports = onePingOnly;
