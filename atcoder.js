const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = 'AtCoder';

module.exports.contests = fetch('https://atcoder.jp/contests/').then(res => res.text()).then((body) => {
    try {
        let contests = [], contest = [];

        body.split('<h3>Upcoming Contests</h3>')[1].split('<h3>Recent Contests</h3>')[0].split('\n').forEach((el) => {
            if (el.indexOf('<td class="text-center">') != -1) {
                contest.push(el.split('\t\t\t\t<td class="text-center">')[1].split('</td>')[0]);
            } else if (el.indexOf('<a') != -1) {
                contest.push(el.split('\t\t\t\t\t<a href="')[1].split('">')[1].split('</a>')[0]);
            }

            if (contest.length == 4) {
                const startTime = moment(contest[0].split('iso=')[1].split('&')[0]).add(-1, 'h');
                const length = contest[2].split(':');

                contests.push([contest[1], startTime, moment(startTime).add(length[0], 'h').add(length[1], 'm')]);
                contest = [];
            }
        });

        return contests;
    } catch (e) {
        return [];
    }
});