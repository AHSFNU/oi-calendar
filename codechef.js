const fetch = require('node-fetch');
const moment = require('moment');
const cheerio = require('cheerio');

module.exports.name = 'CodeChef';

module.exports.contests = fetch('https://www.codechef.com/contests/').then(res => res.text()).then(body => {
    let contests = [];

    const $ = cheerio.load(body);

    $('#future-contests+div>table>tbody>tr').each((index, tr) => {
        let meta = {};

        $(tr).find('td').each((index, td) => {
            const $td = $(td);
            switch (index) {
                case 0:
                    meta.id = $td.text();
                    meta.url = `https://www.codechef.com/${meta.id}`;
                    break;
                case 1: meta.name = $td.find('a').text(); break;
                case 2: meta.startTime = moment($td.attr('data-starttime')); break;
                case 3: meta.endTime = moment($td.attr('data-endtime')); break;
            }
        });

        contests.push(meta);
    });

    return contests;
});