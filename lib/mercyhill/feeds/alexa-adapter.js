var exports = module.exports = {};

function adapt(uid, updateDate, titleText, mainText, redirectionUrl)
{    
    return {
        uid: uid,
        updateDate: updateDate,
        titleText: titleText,
        mainText: mainText,
        redirectionUrl: redirectionUrl
    };
}

exports.adapt = adapt;