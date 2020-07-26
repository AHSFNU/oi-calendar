const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = '洛谷';

module.exports.contests = fetch('https://www.luogu.com.cn/contest/list?_contentOnly=1').then(res => res.text()).then((body) => {
    let contests = [];

    JSON.parse(body).currentData.contests.result.forEach((el) => {
        const startTime = moment(el['startTime'] * 1000);

        if (startTime >= moment()) {
            contests.push([el['name'], startTime, moment(el['endTime'] * 1000)]);
        }
    });

    return contests;
});