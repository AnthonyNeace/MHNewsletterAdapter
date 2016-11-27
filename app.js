/*
    Mercy Hill Newsletter RSS Feed Parser and Publisher

    Anthony Neace, 2016
*/

var rssfeedparser = require('./lib/rssfeedparser.js')
, config = require('./config.js');

rssfeedparser.initialize(config);
rssfeedparser.fetch();