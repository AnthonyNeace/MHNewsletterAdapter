function initialize(input)
{
    if(input != null)
    {
        config.feedUrl = input.feedUrl || config.feedUrl;
        config.desiredItems = input.desiredItems || config.desiredItems;
    }
}

var config = {};

config.feedUrl = '';
config.desiredItems = 1;
config.initialize = initialize;

module.exports = config;