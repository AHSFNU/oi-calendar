const fetch = require('node-fetch');
const moment = require('moment');
const cheerio = require('cheerio');

module.exports.name = 'Libre OJ';
module.exports.icon = {
    url: 'https://loj.ac/favicon.ico',
    variety: ''
};

module.exports.contests = fetch('https://loj.ac/contests').then(res => res.text()).then(body => {
    let contests = [];

    const $ = cheerio.load(body);
    const format = 'YYYY-MM-DD hh:mm:ss';

    $('.padding>.ui.table>tbody>tr').each((index, tr) => {
        let meta = {};

        $(tr).find('td').each((index, td) => {
            const $td = $(td);
            switch (index) {
                case 0: {
                    let $a = $td.children('a');
                    meta.id = parseInt($a.attr('href').split('/').pop());
                    meta.name = $a.text();
                    meta.url = `https://loj.ac/contest/${meta.id}`;
                    break;
                }
                case 1: meta.startTime = moment($td.text(), format); break;
                case 2: meta.endTime = moment($td.text(), format); break;
            }
        });

        if (meta.startTime >= moment()) contests.push(meta);
    });

    return contests;
});