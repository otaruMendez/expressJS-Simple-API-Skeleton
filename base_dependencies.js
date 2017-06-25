/**
 * Created by Babatunde Otaru <otarubabatunde@gmail.com>
 * Keeps All common dependencies across the entire project
 * */
var express = require('express');
var mongoose = require('mongoose');
var responses = require('./responses');
var config = require('./config');
var utils = require('./utils');
var constants = require('./constants');
var jwt = require('jsonwebtoken');


var env = config.development;
mongoose.connect(env.database);

module.exports = {
        jwt: jwt,
        express: express,
        mongoose: mongoose,
        responses: responses,
        config: config,
        utils: utils,
        env: env,
        constants: constants
};