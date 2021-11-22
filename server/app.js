const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

const app = express();

const saltRounds = 10;
const { hash, compare } = bcrypt;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(
    cors({
        origin: '*',
        methods: 'GET, POST, PATCH, DELETE'
    }));

module.exports = { app, knex };
