const fetch = require('node-fetch');
const moment = require('moment');
const cheerio = require('cheerio');

module.exports.name = 'UOJ';
module.exports.icon = {
    url: 'http://uoj.ac/pictures/UOJ_small.png',
    variety: 'circular'
};

module.exports.contests = fetch('https://uoj.ac/contests').then(res => res.text()).then(body => {
    let contests = [];

    const $ = cheerio.load(body);

    $('.uoj-content>.table-responsive:first-of-type>table>tbody>tr').each((index, tr) => {
        let meta = {};

        $(tr).find('td').each((index, td) => {
            const $td = $(td);
            switch (index) {
                case 0: {
                    let $a = $td.children('a');
                    meta.id = parseInt($a.attr('href').split('/').pop());
                    meta.name = $a.text();
                    meta.url = `https://uoj.ac/contest/${meta.id}`;
                    break;
                }
                case 1: meta.startTime = moment($td.find('a').text()); break;
                case 2: {
                    let hours = $td.text().match(/^([\d.]+) .+$/)[1];
                    meta.endTime = moment(meta.startTime).add(hours, 'h');
                    break;
                }
            }
        });

        contests.push(meta);
    });

    return contests;
});