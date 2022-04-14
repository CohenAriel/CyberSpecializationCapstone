var crypto = require('crypto')
var fs = require('fs')

fs.writeFileSync('./.env', 'SECRET=' + crypto.randomBytes(32).toString('hex'))
