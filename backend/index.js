const express = require('express');
const HTTP_SERVER = express();
const cors = require('cors');
require('./Database/DBconfig');
const PORT = process.env.PORT || 6000;

HTTP_SERVER.use(express.json());
HTTP_SERVER.use(express.urlencoded({extended : false}));
HTTP_SERVER.use(cors());

HTTP_SERVER.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}`);
})

HTTP_SERVER.use('/', require('./app'));

