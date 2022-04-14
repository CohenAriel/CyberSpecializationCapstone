var user = require('../model/user')
var bouncer = require ("express-bouncer")(100, 360000, 4);

bouncer.blocked = function (req, res, next, remaining)
{
    console.log('a')
	res.render('login', { title: 'Login', error: `Too many requests have been made, please wait ${~~(remaining/1000)} seconds.` })
}

module.exports = function (app, body) {
    app.get('/login', function (req, res) {
        res.render('login', { title: 'Login' })
    })

    app.post('/login',
        bouncer.block,
        body('username').escape(),
        body('password').escape(),
        function (req, res) {
            user.getByUsername(req.body.username, function (row) {
                if (!row) {
                    res.render('login', { title: 'Login', error: "Username doesn't exist." })
                } else if (user.hashPassword(req.body.password, row['salt']).toString('hex') != row['pwd'].toString('hex')) {
                    res.render('login', { title: 'Login', error: "Password doesn't match." })
                } else {
                    bouncer.reset()
                    req.session.username = req.body.username
                    res.redirect('inbox')
                }
            })
        }
    )
}
