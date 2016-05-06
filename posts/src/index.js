var seneca = require('seneca')();

seneca.use("/crud.js")

seneca.listen(8080)
