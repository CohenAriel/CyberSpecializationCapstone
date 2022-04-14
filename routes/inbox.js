user = require('../model/user')

module.exports = function (app) {
    app.get('/inbox', function (req, res) {
        user.getByUsername(req.session.username, row => {
            if (row && row['messages'])
                res.render('inbox', { title: 'Inbox', messages: row['messages'].split(':').map(m => m.split('~')) })
            else
            res.render('inbox', { title: 'Inbox' })
        })
    })
}
