// Parses raw plaintext from filtered mailchimp response and stores newsletter parts in separate fields

var exports = module.exports = {};

var htmlToText = require('html-to-text');

function filterDescription(item, colorIndex)
{
    // Remove all text after the team color.
    if(colorIndex != null)
    {
        item.plaintext = item.rawPlainText.substring(0, colorIndex);
    }

    // Remove all text before the first link or image; this is usually fluff.
    item.plaintext = item.plaintext.substring(item.plaintext.indexOf("["));

    // Remove all text between square brackets, and the brackets too.
    item.plaintext = item.plaintext.replace(/ *\[[^\]]*]/g, '');

    // Replace 'click here' text that is meant for the emails.
    // TODO: Make this capture 'click here\s.*.' Need to capture any generic 'click here to do x'
    item.plaintext = item.plaintext.replace(/(click here)(?:(\s)*to learn more)?/gim, '');

    // Replace text that is meant as a link for the emails.
    item.plaintext = item.plaintext.replace(/^(Sermon Series)$/gim, '');

    // Replace text that is meant as a link for the emails.
    item.plaintext = item.plaintext.replace(/(Listen to Sermons Here.)/gim, '');

    // Replace text that is meant as a link for the emails.
    item.plaintext = item.plaintext.replace(/(Set up an E-Giving account today.)/gim, '');

    // Replace text that is meant for the emails.
    item.plaintext = item.plaintext.replace(/Reply to this (email|e-mail)./gim, '');
    item.plaintext = item.plaintext.replace(/rsvp and more info here/gim, '');

    // Replace stray character that regex didn't get.
    item.plaintext = item.plaintext.replace(/^\]/, '');   
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