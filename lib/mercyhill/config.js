function initialize(input)
{
    if(input != null)
    {
        config.redirectionUrl = input.redirectionUrl || config.redirectionUrl;
        config.feedManagers = input.feedManagers || config.feedManagers;
        config.replaceMap = input.replaceMap || config.replaceMap;
    }
}

var config = {};

// Defaults
config.redirectionUrl = '';
config.feedManagers = [];
config.replaceMap = new Map();

config.initialize = initialize;

module.exports = config;