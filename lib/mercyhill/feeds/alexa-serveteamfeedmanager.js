// FeedManager Interface
//   pushItemFeed(item)
//   writeToFile()

// Todo: Add writeToSlack?
// Todo: Rename Publisher instead of Manager?

var exports = module.exports = {};
var serveteamfeed = [];
var filepath = 'output/serveteamfeed.json';

var fs = require('fs')
, adapter = require('./alexa-adapter.js');

function pushFeedItem(item)
{
    if(item.serveTeamColorText != null)
    {
        serveteamfeed.push(adapter.adapt(
            item.uid + '-serveteam',
            item.updateDate,
            'Mercy Hill Serve Team',
            item.serveTeamColorText,
            item.redirectionUrl
        ));        
    }   
}

function writeToFile(serveteamfeedjson)
{
    fs.writeFile(filepath, serveteamfeedjson, function (err) {
        if (err) return console.log(err);
        console.log('serveteamfeed.json written');
    });      
}

function compareFeedToFile(serveteamfeedjson)
{
    var obj;
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);

        if(obj != null && obj.length > 0 && JSON.stringify(obj) == serveteamfeedjson)
        {
            console.log('serveteamfeed.json not written - new data matches existing data')
        }
        else if(obj != null && obj.length > 0)
        {
            writeToFile(serveteamfeedjson);
        }
        else
        {
            console.log('serveteamfeed.json not written - new data null or empty')         
        }        
    }); 
}

function readFile(serveteamfeedjson)
{
    fs.stat(filepath, function(err, stat) {
        if(err == null) {
            compareFeedToFile(serveteamfeedjson);
        } else if(err.code == 'ENOENT') {
            // file does not exist
            writeToFile(serveteamfeedjson);
        } else {
            console.log('Error while reading serveteamfeed file: ', err.code);
        }
    });
}

function write()
{
    if(serveteamfeed != null && serveteamfeed.length > 0) 
    {
        var serveteamfeedjson = JSON.stringify(serveteamfeed);  

        readFile(serveteamfeedjson);
    }
    else
    {
        console.log('No serve team feed file written; serveteamfeed was empty')
    }    
}



exports.push = pushFeedItem;
exports.write = write;