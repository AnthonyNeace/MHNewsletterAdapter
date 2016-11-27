function initialize(input)
{
    if(input != null)
    {
        config.redirectionUrl = input.redirectionUrl || config.redirectionUrl;
        config.feedManagers = input.feedManagers || config.feedManagers;
    }
}

var config = {};

config.redirectionUrl = '';
config.feedManagers = [];
config.initialize = initialize;

module.exports = config;