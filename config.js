var config = {};

config.feedUrl = 'http://us2.campaign-archive2.com/feed?u=2f2d857b4480a0883c6740273&id=7638673db2';
config.desiredItems = 1;

config.redirectionUrl = 'https://www.mercyhillshep.org/';
config.feedManagers = [
    require('./lib/mercyhill/feeds/alexa-newsletterfeedmanager.js'),
    require('./lib/mercyhill/feeds/alexa-serveteamfeedmanager.js')
];

config.replaceMap = new Map();
// Remove all text between square brackets, and the brackets too.
config.replaceMap.set(/ *\[[^\]]*]/g, '');
// Replace 'click here' text that is meant for the emails.
// TODO: Make this capture 'click here\s.*.' Need to capture any generic 'click here to do x'    
config.replaceMap.set(/(click here)(?:(\s)*to learn more)?/gim, '');
// Replace text that is meant as a link for the emails.    
config.replaceMap.set(/^(Sermon Series)$/gim, '');
// Replace text that is meant as a link for the emails.     
config.replaceMap.set(/(Listen to Sermons Here.)/gim, '');
// Replace text that is meant as a link for the emails.     
config.replaceMap.set(/(Set up an E-Giving account today.)/gim, '');
// Replace text that is meant for the emails.
config.replaceMap.set(/Reply to this (email|e-mail)./gim, '');
config.replaceMap.set(/rsvp and more info here/gim, '');
// Replace stray character that regex didn't get.
config.replaceMap.set(/^\]/, '');    

module.exports = config;