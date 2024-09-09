const express = require('express');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { trace, context, propagation } = require('@opentelemetry/api');
const cors = require('cors');

// Set up OpenTelemetry for the backend with a service name
const provider = new NodeTracerProvider({
  resource: new Resource({
    'service.name': 'backend-service', // Set the service name for your back-end
  }),
});

// Set up the OTLP exporter
const exporter = new OTLPTraceExporter({
  url: 'http://collector:4318/v1/traces',  // Point to the OpenTelemetry Collector
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

const tracer = trace.getTracer('backend-service');
const app = express();
const port = 3001;

// Enable CORS for all requests
app.use(cors());

let clickCount = 0;  // Initialize an in-memory counter

// Handle the /api/data request and propagate trace context
app.get('/api/data', (req, res) => {
  // Extract trace context from the incoming request's headers
  const extractedContext = propagation.extract(context.active(), req.headers);

  // Start a span for the API request, continuing the trace from the front-end
  const span = tracer.startSpan('handle-api-data', {
    attributes: { 'http.method': 'GET', 'http.route': '/api/data' }
  }, extractedContext);

  clickCount += 1;  // Increment the counter

  // Return a sample JSON response with a message and the counter
  res.json({ message: 'Hello from the backend!', count: clickCount });

  // End the span after sending the response
  span.end();
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});