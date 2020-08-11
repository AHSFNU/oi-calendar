const fetch = require('node-fetch');
const moment = require('moment');
const cheerio = require('cheerio');
const { unescape } = require('html-escaper');

module.exports.name = '牛客';
module.exports.icon = {
    url: 'https://static.nowcoder.com/images/logo_87_87.png',
    variety: 'circular'
};

module.exports.contests = fetch('https://ac.nowcoder.com/acm/contest/vip-index').then(res => res.text()).then(body => {
    let contests = [];

    const $ = cheerio.load(body);

    $('.js-current>.js-item').each((index, el) => {
        const data = JSON.parse(unescape($(el).attr('data-json')));
        contests.push({
            id: data.contestId,
            name: data.contestName,
            url: `https://ac.nowcoder.com/acm/contest/${data.contestId}`,
            startTime: moment(data.contestStartTime),
            endTime: moment(data.contestEndTime)
        });
    });

    return contests;
});