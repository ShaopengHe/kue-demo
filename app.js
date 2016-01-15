var Q = require('./queue');
var basicAuth = require('basic-auth-connect');
var config = require('./config');

/*
 * kue-ui

var express = require('express');
var ui = require('kue-ui');
var app = express();

var uiOptions = {
  apiURL: '/api',       // IMPORTANT: specify the api url
  baseURL: '/',         // IMPORTANT: specify the base url
  updateInterval: 1000  // Optional: Fetches new data every 3000 ms
};

ui.setup(uiOptions);

app.use(basicAuth(config.kueUI.username, config.kueUI.password));

// Mount kue JSON api
app.use(uiOptions.apiURL, Q.kue.app);

// Mount UI
app.use(uiOptions.baseURL, ui.app);
*/

/*
 * Kue
 */
var app = Q.kue.app;
app.set('title', 'Kue Service');
app.use(basicAuth(config.kueUI.username, config.kueUI.password));

var port = +process.env.PORT || config.kueUI.port;
app.listen(port, function() {
  console.log('Listening on port:' + port);
});

setInterval(function() {
  Q.kue.Job.rangeByState( 'complete', 0, 1000, 'asc', function( err, jobs ) {
    jobs.forEach( function( job ) {
      if (Date.now() - job['updated_at'] > 5 * 60 * 1000) {
        job.remove(function() {
          console.log('removed ', job.id);
        });
      }
    });
  });
}, 1000 * 60);

setInterval(function() {
  Q.kue.Job.rangeByState( 'failed', 0, 1000, 'asc', function( err, jobs ) {
    jobs.forEach( function( job ) {
      if (Date.now() - job['updated_at'] > 30 * 60 * 1000) {
        job.remove(function() {
          console.log('removed ', job.id);
        });
      }
    });
  });
}, 5 * 1000 * 60);
