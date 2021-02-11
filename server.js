const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const PORT = 6969;
server.use(bodyParser.json());
server.listen(PORT);

