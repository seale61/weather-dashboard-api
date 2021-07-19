const express = require('express');
const cors    = require('cors')
const app     = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

require('./routes')(app);
const PORT = 5000;

app.listen(PORT);