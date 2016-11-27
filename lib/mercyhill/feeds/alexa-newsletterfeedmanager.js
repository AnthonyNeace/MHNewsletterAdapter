// FeedManager Interface
//   pushItemFeed(item)
//   writeToFile()

// Todo: Add writeToSlack?
// Todo: Rename Publisher instead of Manager?

var exports = module.exports = {};
var newsletterfeed = [];
var filepath = 'output/newsletterfeed.json';

var fs = require('fs');

function pushFeedItem(item)
{
    if(item != null)
    {
        newsletterfeed.push({
            uid: item.uid + '-newsletter',
            updateDate: item.updateDate,
            titleText: item.titleText,
            mainText: item.description,
            redirectionUrl: item.redirectionUrl
        });
    }
}

function writeToFile()
{
    if(newsletterfeed != null && newsletterfeed.length > 0) 
    {
        var newsletterfeedjson = JSON.stringify(newsletterfeed);

        fs.writeFile(filepath, newsletterfeedjson, function (err) {
            if (err) return console.log(err);
            console.log('newsletterfeed.json written');
        });      
    }
    else
    {
        console.log('No newsletter feed file written; newsletterfeed was empty')
    }
}

exports.push = pushFeedItem;
exports.write = writeToFile;