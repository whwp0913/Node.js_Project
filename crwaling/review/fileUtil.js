var fs = require('fs');

function postIdsToFile(obj) {
    fs.writeFileSync('./review_ids1', JSON.stringify(obj), {flags: 'w'});
}

function postIdsToObject() {
    if (fs.existsSync('./review_ids1')) {
        var str = fs.readFileSync('./review_ids1', 'utf-8');
        if (str === undefined || str === null || str.trim() === '') {
            return [];
        }
        return JSON.parse(str);
    }
    return [];
}

module.exports = { get : postIdsToObject , set : postIdsToFile }
