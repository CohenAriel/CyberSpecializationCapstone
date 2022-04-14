const sqlite3 = require("sqlite3");
db = new sqlite3.Database("db")

db.exec("DROP TABLE IF EXISTS users")


db.exec("CREATE TABLE users ( \
            name TEXT NOT NULL, \
            pwd TEXT NOT NULL, \
            salt TEXT NOT NULL, \
            messages TEXT \
        );"
)

db.close()
