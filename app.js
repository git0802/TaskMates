const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/tasks');
const usersRouter = require('./routes/users'); 
const billsRouter = require('./routes/bills');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/tasks', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/bills', billsRouter);

module.exports = app;
