"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var consola = require('consola');
var fallback = require('express-history-api-fallback');
exports.default = (function (port) {
    consola.start('💪 Rekit Studio...');
    var app = express();
    var server = http.createServer(app);
    var root = path.join(__dirname, '../build');
    app.use(express.static(root));
    app.use(fallback('index.html', { root: root }));
    app.use(bodyParser.json({ limit: '5MB' }));
    app.use(bodyParser.urlencoded({ extended: true }));
    server.listen(port, function (error) {
        app.use(function (err, req, res, next) {
            res.status(500).send({ error: err.message });
        });
        consola.success("\uD83C\uDD97 Sky Rekit Studio is running at http://localhost:" + port + "/ ");
    });
    return app;
});
