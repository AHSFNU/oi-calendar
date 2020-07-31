const fs = require('fs');
const Koa = require('koa');
const cors = require('@koa/cors');
const moment = require('moment');

const config = require('./config.json');

const contests = [];

Promise.all(config.enabled_oj.map(file => {
    const oj = require(`./${file}`);
    return oj.contests.then(list => {
        console.log(`Loaded: ${oj.name}, ${list.length} contests`);
        return list.forEach(el => contests.push({ oj: oj.name, ...el }));
    });
})).then(() => {
    contests.sort((a, b) => a.startTime - b.startTime);

    const app = new Koa;
    app.use(cors());

    const lastUpdateTime = moment();
    app.use(async (ctx) => {
        ctx.body = {
            'status': 'OK',
            'lastUpdateTime': lastUpdateTime,
            'contests': contests
        };
    });

    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}...`);
    });
}).catch(err => {
    console.error(err);
    process.exit(1);
});