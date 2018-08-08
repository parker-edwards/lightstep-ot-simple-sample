var express = require('express');
var router = express.Router();

let opentracing = require('opentracing');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers);
  res.render('index', { title: 'Express' });
});

router.get('/XHR', function(req, res, next) {
  let extractedContext = opentracing.globalTracer().extract(opentracing.FORMAT_HTTP_HEADERS,req.headers);
  let span = opentracing.globalTracer().startSpan('XHR-start', {childOf : extractedContext });
  // span.setTag("id", "email-here");
  span.finish();
  let tracelink = span.generateTraceURL();
  console.log(tracelink);
  res.send(tracelink);
});

module.exports = router;
