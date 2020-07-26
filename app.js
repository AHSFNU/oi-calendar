const fs = require('fs');
const Koa = require('koa');
const { COPYFILE_EXCL } = require('constants');

const contests = [];

Promise.all(fs.readdirSync('.').filter((file) => file.endsWith('.js') && file != 'app.js').map((file) => {
    const oj = require(`./${file}`);
    return oj.contests.then(list => list.forEach((el) => contests.push([oj.name, ...el])));
})).then(() => {
    contests.sort((a, b) => a[2] - b[2]);
    
    const app = new Koa;
    app.use(async (ctx) => {
        ctx.body = {
            'status': 'OK',
            'contests': contests
        };
    });

    app.listen(8080);
;});