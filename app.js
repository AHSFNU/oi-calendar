const fs = require('fs');
const Koa = require('koa');
const moment = require('moment');

const config = require('./config.json');

const contests = [];
const lastUpdateTime = moment();

Promise.all(fs.readdirSync('.').filter((file) => file.endsWith('.js') && file != 'app.js').map((file) => {
    const oj = require(`./${file}`);
    return oj.contests.then(list => list.forEach((el) => contests.push([oj.name, ...el])));
})).then(() => {

    contests.sort((a, b) => a[2] - b[2]);

    const app = new Koa;
    app.use(async (ctx) => {
        ctx.body = {
            'status': 'OK',
            'lastUpdateTime': lastUpdateTime,
            'contests': contests.map(([oj, name, startTime, endTime]) => ({ oj, name, startTime, endTime }))
        };
    });

    app.listen(config.port);
;});