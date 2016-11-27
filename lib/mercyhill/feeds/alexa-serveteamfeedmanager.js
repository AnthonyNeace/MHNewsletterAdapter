// FeedManager Interface
//   pushItemFeed(item)
//   writeToFile()

// Todo: Add writeToSlack?
// Todo: Rename Publisher instead of Manager?

var exports = module.exports = {};
var serveteamfeed = [];
var filepath = 'output/serveteamfeed.json';

var fs = require('fs');

function pushFeedItem(item)
{
    if(item.serveTeamColorText != null)
    {
        serveteamfeed.push({
            uid: item.uid + '-serveteamfeed',
            updateDate: item.updateDate,
            titleText: "Mercy Hill Serve Team",
            mainText: item.serveTeamColorText,
            redirectionUrl: item.redirectionUrl
        });   
    }   
}

function writeToFile()
{
    // If these newsletters had serve team data, write that out to a separate json file also
    if(serveteamfeed != null && serveteamfeed.length > 0)
    {
        var serveteamfeedjson = JSON.stringify(serveteamfeed);

        fs.writeFile(filepath, serveteamfeedjson, function (err) {
            if (err) return console.log(err);
            console.log('serveteamfeed.json written');
        });  
    }
}

exports.push = pushFeedItem;
exports.write = writeToFile;