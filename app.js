const fs = require('fs');
const Koa = require('koa');
const cors = require('@koa/cors');
const moment = require('moment');

const config = require('./config.json');

Promise.all(config.enabled_oj.map(file => {
    const { contests, ...oj } = require(`./${file}`);
    return contests.then(contests => {
        console.log(`Loaded: ${oj.name}, ${contests.length} contests`);
        return { id: file, ...oj, contests };
    });
})).then(oj_list => {
    const app = new Koa;
    app.use(cors());

    const lastUpdateTime = moment();
    app.use(async (ctx) => {
        ctx.body = {
            'status': 'OK',
            'lastUpdateTime': lastUpdateTime,
            'oj': oj_list
        };
    });

    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}...`);
    });
}).catch(err => {
    console.error(err);
    process.exit(1);
});