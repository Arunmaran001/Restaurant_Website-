const restaurant = require('express');

const App_Server = restaurant()
App_Server.use('/api', require('./Routes/Routes1'))

module.exports = App_Server;