# OpenTracing Browser to Backend Sample
This app is a simple Express app which demonstrates how distributed tracing works using the [LightStep Javascript Tracer](https://github.com/lightstep/lightstep-tracer-javascript) and [OpenTracing instrumentation](https://github.com/opentracing/opentracing-javascript).

## Design
The application defaults to hosting a single user-facing page at `localhost:3000`. App structure is generated automatically by [Express Generator](https://www.npmjs.com/package/express-generator). There is an additional route at `localhost:3000/XHR` which accepts GET requests and returns a link to the trace for that request in LightStep. The "front-end" includes the minified version of the LightStep Javascript Tracer, and is configured to automatically instrument all XHR requests. The "back-end" utilizes the NPM version of the LightStep Javascript Tracer, and is configured to create a child span for the inbound XHR requests from the "front-end". The OpenTracing SpanContext is propagated using HTTP headers.

## Getting Started
You will need to include your LightStep access token before starting the service.

**app.js**
```
opentracing.initGlobalTracer(new lightstep.Tracer({
  access_token   : 'access-token-here',
  component_name : 'node-training',
  verbosity : 3
}));
```

**views/index.ejs**
```
<head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <script src="/javascripts/opentracing-browser.min.js"></script>
    <script src="/javascripts/lightstep-tracer.min.js" data-init_global_tracer="true" data-access_token="access-token-here" data-component_name="browser-training" data-verbosity=3 data-instrument_page_load="false" data-xhr_instrumentation="true"></script>
  </head>
  ```

  **Starting the service**
  *Optional: [Nodemon](https://www.npmjs.com/package/nodemon) is included in the `package.json` and `nodemon start` can be used in substitution for `npm start` below.*

  1. `git clone` this repo into your workspace
  2. Include the LightStep access token in the two files referenced above
  3. *Optional: remove the commented `span.setTag` line in `index.js` and include an identifier in the value to make it easy to search for a trace later in LightStep*
  4. Install the dependnencies: `npm install`
  5. Start the service: `npm start`