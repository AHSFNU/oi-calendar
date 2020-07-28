const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = '牛客';

module.exports.contests = fetch('https://ac.nowcoder.com/acm/contest/vip-index').then(res => res.text()).then(body => {
    let contests = [], contest = [];
    let isContestTime = false;

    body.split('<h2>等你来战</h2>')[1].split('<h2>已结束</h2>')[0].split('\n').forEach((el) => {
        if (el.indexOf('<a href="/acm') == 0) {
            contest.push(el.split('<a href="/acm')[1].split('" target="_blank">')[1].split('</a>')[0]);
        } else if (el.indexOf('比赛时间') != -1) {
            contest.push(moment(el.split('：')[1], 'YYYY-MM-DD HH:mm'));
            isContestTime = true;
        } else if (el.indexOf('至') && isContestTime) {
            contest.push(moment(el.split('至 ')[1], 'YYYY-MM-DD HH:mm'));
            isContestTime = false;
        }

        if (contest.length == 3) {
            contests.push(contest);
            contest = [];
        }
    });

    return contests;
});