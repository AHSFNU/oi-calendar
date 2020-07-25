const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = 'Codeforces';

// Because of the Internet connection to Codeforces in China,
// you may need to use a mirror site such as codeforces[dot]ml and codeforc[dot]es.

module.exports.contests = fetch('https://codeforc.es/api/contest.list').then(res => res.text()).then((body) => {
    let contests = [];

    JSON.parse(body)['result'].filter((el) => el['phase'] === 'BEFORE').forEach((el) => {
        contests.push([el['name'], moment(el['startTimeSeconds'] * 1000), moment(el['startTimeSeconds'] * 1000).add(el['durationSeconds'], 's')]);
    });

    return contests;
});