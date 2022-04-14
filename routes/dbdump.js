const { exec } = require("child_process");

module.exports = function (app) {
    app.get('/dbdump', (req, res) => {
        exec('sqlite3 db .dump', (err, stdout) =>
            res.send(stdout))
    })
}