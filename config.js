var config = {};

config.feedUrl = 'http://us2.campaign-archive2.com/feed?u=2f2d857b4480a0883c6740273&id=7638673db2';
config.desiredItems = 1;

config.redirectionUrl = 'https://www.mercyhillshep.org/';
config.feedManagers = [
    require('./lib/mercyhill/feeds/alexa-newsletterfeedmanager.js'),
    require('./lib/mercyhill/feeds/alexa-serveteamfeedmanager.js')
];

module.exports = config;