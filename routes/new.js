var user = require('../model/user')

module.exports = function (app, body) {
    app.get('/new', function (req, res) {
        res.render('new', { title: 'New Message' })
    })

    app.post('/new', body('target').trim().escape(), body('message').trim().escape(), function (req, res) {
        user.getByUsername(req.body.target, row => {
            if (!row) {
                res.render('new', { title: 'New Message', error: true })
            } else {
                user.sendMessage(req.body.target, req.body.message + '~' + new Date().toISOString().slice(0, 10)
                + '~' + req.session.username)
            }
        })
    })
}