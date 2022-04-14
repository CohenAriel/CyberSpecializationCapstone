var { body, validationResult } = require('express-validator')
var { rword } = require('rword')
rword.load('big')

var user = require('../model/user')

module.exports = function (app) {
    app.get('/register', function (req, res) {
        if (req.query.gen == '')
            res.send(rword.generate(4, { length: '3-12' }).join(' '))
        else
            res.render('register', { title: 'Register' })
    })

    app.post('/register',
        body('username').exists()
            .notEmpty().withMessage('Username required.')
            .matches(/^[\w\d-]*$/).trim().withMessage('Username must only contain letters, digits, dashes or underscores')
            .isLength({ max: 20 }).withMessage('Username must be at most 20 characters long.')
            .escape(),
        body('password').exists()
            .trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
            .escape(),
        body('confirm').exists()
            .trim().escape()
            .custom(async (confirm, { req }) => {
                if (req.body.password != confirm)
                    throw new Error('Passwords must be the same.')
            }),
        function (req, res) {
            user.getByUsername(req.body.username, row => {
                if (!validationResult(req).isEmpty()) {
                    res.render('register', { title: 'Register', errors: validationResult(req).array().map(e => e['msg']) })
                } else if (row) {
                    res.render('register', { title: 'Register', errors: ['Username taken.'] })
                } else {
                    user.register(req.body.username, req.body.password)
                    res.redirect('login')
                }
            })
        }
    )
}
