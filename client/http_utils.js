const request = require('request');

const URL = 'http://localhost:3000/';

module.exports = {
    sendGetAndPrintResult: (query, cb) => {
        request(`${URL}${query}`, function (er, resp, body) {
            const formattedResp = JSON.parse(body).join('\n')
            console.log(`\n${formattedResp}\n`);
            cb();
        });
    },

    sendPost: (path, body, cb) => {
        request.post(
            `${URL}${path}`,
            { json: body },
            (er, resp) => { cb(); }
        );
    }
}