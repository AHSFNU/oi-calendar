const fetch = require('node-fetch');
const moment = require('moment');
const cheerio = require('cheerio');

module.exports.name = 'AtCoder';

module.exports.contests = fetch('https://atcoder.jp/contests/').then(res => res.text()).then(body => {
    try {
        let contests = [];

        const $ = cheerio.load(body);

        $('#contest-table-upcoming table>tbody>tr').each((index, tr) => {
            let meta = {};

            $(tr).find('td').each((index, td) => {
                const $td = $(td);
                switch (index) {
                    case 0: meta.startTime = $td.find('time').text(); break;
                    case 1: meta.name = $td.find('a').text(); break;
                    case 2: meta.duration = $td.text(); break;
                }
            });

            const startTime = moment(meta.startTime);
            const endTime = moment(startTime).add(meta.duration);
            contests.push([meta.name, startTime, endTime]);
        });

        return contests;
    } catch (e) {
        return [];
    }
});