const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = 'Codeforces';

module.exports.contests = fetch('https://codeforces.com/api/contest.list').then(res => res.text()).then((body) => {
    let contests = [];

    JSON.parse(body)['result'].filter((el) => el['phase'] === 'BEFORE').forEach((el) => {
        contests.push([el['name'], moment(el['startTimeSeconds'] * 1000), moment(el['startTimeSeconds'] * 1000).add(el['durationSeconds'], 's')]);
    });

    return contests;
});