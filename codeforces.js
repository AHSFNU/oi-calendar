const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = 'Codeforces';
module.exports.icon = {
    url: 'https://sta.codeforces.com/favicon-96x96.png',
    variety: ''
};

// Because of the Internet connection to Codeforces in China,
// you may need to use a mirror site such as codeforces[dot]ml and codeforc[dot]es.

module.exports.contests = fetch('https://codeforces.com/api/contest.list').then(res => res.text()).then(body => {
    let contests = [];

    JSON.parse(body)['result'].filter((el) => el['phase'] === 'BEFORE').forEach((el) => {
        const startTime = moment(el['startTimeSeconds'] * 1000);
        contests.push({
            id: el['id'],
            name: el['name'],
            url: `https://codeforces.com/contests/${el['id']}`,
            startTime: startTime,
            endTime: moment(startTime).add(el['durationSeconds'], 's')
        });
    });

    return contests;
});