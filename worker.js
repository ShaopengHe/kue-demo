var Q = require('./queue');

process.once('SIGTERM', function() {
  Q.shutdown(5000, function(err) {
    console.log('Kue shutdown: ', err || '');
    process.exit(0);
  });
});

Q.process('monitor', 5, function(job, done) {
  var failed = !!(Date.now() % 2);
  setTimeout(function() {
    if (failed) {
      return done(new Error('failed'));
    }
    job.progress(1, 1);
    return done(null, { finishedAt: new Date() });
  }, 1000);
});

Q.process('spider', 5, function(job, done) {
  var failed = !!(Date.now() % 2);
  var totalCount = Math.ceil(Math.random() * 10);
  var count = totalCount;
  var interval = setInterval(function() {
    if (!count) {
      clearInterval(interval);
      if (failed) {
        return done(new Error('failed'));
      }
      return done(null, { finishedAt: new Date() });
    }
    job.progress((totalCount - count + 1), totalCount);
    count--;
  }, 1000);
});
