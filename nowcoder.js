const fetch = require('node-fetch');
const moment = require('moment');
const cheerio = require('cheerio');

module.exports.name = '牛客';

module.exports.contests = fetch('https://ac.nowcoder.com/acm/contest/vip-index').then(res => res.text()).then(body => {
    let contests = [];

    const $ = cheerio.load(body);

    $('.js-current>.js-item').each((index, el) => {
        const data = JSON.parse($(el).attr('data-json').replace(/&quot;/g, '"'));
        contests.push({
            name: data.contestName,
            startTime: moment(data.contestStartTime),
            endTime: moment(data.contestEndTime)
        });
    });

    return contests;
});