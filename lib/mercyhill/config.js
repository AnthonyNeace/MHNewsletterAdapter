var config = {};

config.redirectionUrl = 'https://www.mercyhillshep.org/';
config.feedManagers = [
    require('./feeds/alexa-newsletterfeedmanager.js'),
    require('./feeds/alexa-serveteamfeedmanager.js')
];

module.exports = config;