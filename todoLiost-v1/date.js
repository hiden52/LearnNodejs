//  //module.exports is a Object!
// module.exports= {
//     "getDate"   : getDate,
//     "getDay"    : getDay    
// }

exports.getDate = function() {  // === module.exports
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    return today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
    const today = new Date();

    const options = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-US", options);
}

//console.log(module.exports);
