var Q = require('./queue');

// monitor data
setInterval(function() {
  var job = {
    from: 'node-' + Math.floor(Math.random() * 10),
    title: 'heartbeat-' + new Date(),
    data: {
      cpu: Math.floor(Math.random() * 100),
      mem: Math.ceil(Math.random() * 100)
    }
  };

  Q.create('monitor', job)
  .priority('high')
  .attempts(3)
  .ttl(5000)
  .delay(Math.floor(Math.random() * 1000 * 5))
  .log(job)
  // .removeOnComplete(true)
  .save();

}, 1000);


// workflow
var crawlUrls = [
  'http://126.com',
  'http://163.com',
  'http://github.com',
  'http://mongodb.com',
  'http://nodejs.org',
  'http://qq.com',
  'http://redis.io',
  'http://taobao.com',
  'http://tmall.com',
  'http://weibo.com',
  'http://www.google.com',
  'http://z.cn',
  'http://zhihu.com'
];

setInterval(function() {
  var url = crawlUrls[Math.floor(Math.random() * crawlUrls.length)];
  var job = {
    title: url,
    url: url,
    time: new Date()
  };

  Q.create('spider', job)
  .priority(Math.floor(Math.random() * 10))
  .attempts(5)
  .ttl(5000)
  .log(job)
  // .removeOnComplete(true)
  .save();
}, 2000);
