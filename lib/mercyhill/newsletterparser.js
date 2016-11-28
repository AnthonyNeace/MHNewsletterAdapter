// Parses raw plaintext from filtered mailchimp response and stores newsletter parts in separate fields

var exports = module.exports = {};

var htmlToText = require('html-to-text');

function filterDescription(item, colorIndex, config)
{
    // Remove all text after the team color.
    if(colorIndex != null)
    {
        item.plaintext = item.rawPlainText.substring(0, colorIndex);
    }

    // Remove all text before the first link or image; this is usually fluff.
    item.plaintext = item.plaintext.substring(item.plaintext.indexOf("["));

    config.replaceMap.forEach(function (newString, old) {
      item.plaintext = item.plaintext.replace(old, newString);
    }); 
}

function buildDescription(item)
{
    var strings = [];
    strings.push(item.plaintext);
    if(item.serveTeamColorText != null)
    {
        strings.push(item.serveTeamColorText);
    }
    strings.push(item.sermonAvailableText);
    strings.push(item.facebookText);
    strings.push(item.twitterText);
    strings.push(item.newsletterText);

    item.description = htmlToText.fromString(strings.join(" "));

    item.description = item.description.replace(/\n/g, " ");
}

function buildUid(item)
{
    item.uid = item.uid.replace("http://us2.campaign-archive.com/?u=", "");
    item.uid = item.uid.replace("&id=", "-");
}

function buildServeTeam(item)
{
    var myRegexp = /This week is\s?(RED|BLUE|YELLOW|GREEN)/;
    var match = myRegexp.exec(item.rawPlainText);

    if(match != null && match[1] != null)
    {
        item.serveTeamColor = match[1]; 
        item.serveTeamColorText = "This week's serve team color is " + match[1] + ". Please let us know if you would like to join a serve team!";
    }     

    return match;  
}

function buildFooter(item)
{
    item.sermonAvailableText = "Our sermons are available online at mercy hill shep dot org slash sermons, or on iTunes.";
    item.facebookText = "Find us on FaceBook at mercy hill baptist.";
    item.twitterText = "Tweet us at MercyHillShep.";
    item.newsletterText = "Visit our website at mercy hill shep dot org to subscribe to this weekly newsletter via e-mail.";
}

exports.filterDescription = filterDescription;
exports.buildDescription = buildDescription;
exports.buildUid = buildUid;
exports.buildServeTeam = buildServeTeam;
exports.buildFooter = buildFooter;