const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = 'CodeChef';

module.exports.contests = fetch('https://www.codechef.com/contests/').then(res => res.text()).then(body => {
    let contests = [], contest = [];

    body.split('<h3 id="future-contests">Future Contests</h3>')[1].split('<h3 id="past-contests">Past Contests</h3>')[0].split('<tbody>')[1].split('</tbody>')[0].split('\n').forEach((el) => {
        if (el.indexOf('<a') != -1) {
            contest.push(el.split('>')[1].split('<')[0]);
        } else if (el.indexOf('starttime') != -1 || el.indexOf('endtime') != -1) {
            contest.push(moment(el.split('"')[1]));
        }

        if (contest.length == 3) {
            contests.push(contest);
            contest = [];
        }
    });

    return contests;
});