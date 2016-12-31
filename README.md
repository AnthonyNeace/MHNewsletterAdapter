# MHNewsletterAdapter
Parses a mailchimp RSS feed and adapts output to various data types and/or destinations.

## Usage

    npm install
    
    npm start

## Output

After parsing the RSS feed, the following publishing options are currently supported:

### Example 1: Amazon Alexa compatible JSON feed (Newsletter)

In this example, content from the RSS feed (specifically Title, PubDate, and various parts of the Description) is adapted to [a JSON array that is compatible with Amazon Alexa's "Flash Briefing" skill type](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/flash-briefing-skill-api-feed-reference#json-message-examples). This example captures most of the content of the RSS feed's description in mainText and acts as the default feed for the resulting Alexa skill.

#### Format

A JSON file written to `./output/newsletterfeed.json`:

    [{
      "uid": "2f2d857b4480a0883c6740273-080531b6ad-newsletter",
      "updateDate": "2016-11-25T23:11:20.000Z",
      "titleText": "Mercy Hill News!",
      "mainText": "Weekly Newsletter content goes here.",
      "redirectionUrl": "https://www.mercyhillshep.org/"
    }]

#### Video

[![Alexa - Mercy Hill Newsletter Demo](http://img.youtube.com/vi/lIMXH-aarto/0.jpg)](http://www.youtube.com/watch?v=lIMXH-aarto "Click for YouTube Video: Alexa - Mercy Hill Newsletter Demo")

### Example 2: Amazon Alexa compatible JSON feed (Serve Team)

In this example, content from the RSS feed (specifically Title, PubDate, and various parts of the Description) is adapted to [a JSON array that is compatible with Amazon Alexa's flash briefing skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/flash-briefing-skill-api-feed-reference#json-message-examples). This example captures a small portion of the content of the RSS feed's description in mainText and acts as a secondary feed for the resulting Alexa skill.

#### Format

A JSON file written to `./output/serveteamfeed.json`:

    [{
      "uid": "2f2d857b4480a0883c6740273-080531b6ad-serveteamfeed",
      "updateDate": "2016-11-25T23:11:20.000Z",
      "titleText": "Mercy Hill Serve Team",
      "mainText": "This week's serve team color is RED.",
      "redirectionUrl": "https://www.mercyhillshep.org/"
    }]

#### Video

[![Alexa - Mercy Hill Serve Team Demo](http://img.youtube.com/vi/lIRUHjR1VBI/0.jpg)](http://www.youtube.com/watch?v=lIRUHjR1VBI "Click for YouTube Video: Alexa - Mercy Hill Serve Team Demo")
