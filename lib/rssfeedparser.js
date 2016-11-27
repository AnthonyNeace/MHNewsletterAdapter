/*
    RSS Feed Parser

    This parser uses the feedparser npm package to parse a mailchimp RSS feed
    and pass the resulting js object on to other routines.

    To replace the manager var, create a js file with the following functions:

        readitem(results, item);
            Read each item in the feed.

        processItem(item);
            Post-processing of feed items after the feed reader has finished.

        writeFiles(item);
            (Optional) Intended to handle output after processing. Can be 
            toggled off with writeFiles bool in config.js.
*/

var exports = module.exports = {};

var FeedParser = require('feedparser')
, request = require('request')
, manager = require('./mercyhill/newslettermanager.js')
, config = require('./config.js');

var desired = config.desiredItems;
var results = [];

function fetch()
{
    var req = request(config.feedUrl)
    , feedparser = new FeedParser();

    req.on('error', function (error) {
       console.log('Error during feed request: ' + error)
    });
    req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
    });

    feedparser.on('error', function(error) {
        console.log('Error during feed parsing: ' + error)
    });
    feedparser.on('readable', read);
    feedparser.on('end', processFeed);
}

function read()
{
    var stream = this, item;
    while ((item = stream.read()) && results.length < desired) {
        manager.readItem(results, item);
    }   
}

function processFeed(err) {
    if (err) {
        console.log(err, err.stack);
        return process.exit(1);
    }
    
    for (var i = 0, len = results.length; i < len; i++) {
        manager.processItem(results[i]);
    }

    if(config.writeFiles)
    {
        manager.writeOutput(function(err) {
            if (err) return console.log(err);
        });
    }
}

exports.fetch = fetch;