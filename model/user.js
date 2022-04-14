var crypto = require('crypto')
var sqlite3 = require('sqlite3')
db = new sqlite3.Database('db')
require('dotenv').config('./.env')
var algorithm = 'aes-256-cbc'
var key = process.env.SECRET

exports.register = function (uname, pwd) {
    crypto.randomBytes(16, (err, salt) => {
        crypto.pbkdf2(pwd, salt, 1000, 64, 'sha512', (err, hash) => {
            db.run('INSERT INTO users (name, pwd, salt, messages) VALUES (?, ?, ?, ?)', uname, hash, salt, '')
        })
    })
}

exports.getByUsername = async function (uname, cb) {
    db.get('SELECT * FROM users WHERE name = ? LIMIT 1', uname, (err, row) => cb(row))
}

exports.hashPassword = function (pwd, salt) {
    return crypto.pbkdf2Sync(pwd, salt, 1000, 64, 'sha512')
}

exports.sendMessage = function (target, msg) {
    db.run('UPDATE users SET messages=messages || ":" || ? where name=?', msg, target)
}
