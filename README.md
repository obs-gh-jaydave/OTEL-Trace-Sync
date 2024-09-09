Here's an updated version of your `README.md`:
# OpenTelemetry Frontend-Backend Tracing Example

This project demonstrates how to capture and visualize traces of user actions from a frontend React app and propagate those traces through to the backend Node.js API using OpenTelemetry. It is a full-stack application showcasing how to track interactions and automatically generate correlated traces from frontend to backend services.

## Features

- Capture page load and button click events in the frontend
- Propagate the trace context from the frontend to the backend API
- View correlated traces of user actions across frontend and backend services
- Export traces using the OpenTelemetry Collector

## Project Structure

- **frontend/**: Contains the React application that captures user interactions (e.g., page load, button click) and sends traces to the backend.
- **backend/**: Contains the Node.js application that receives API requests from the frontend, processes them, and sends correlated traces back through OpenTelemetry.

## Prerequisites

- Docker
- Node.js (v16 or higher)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/OTEL-Trace-Sync.git
cd OTEL-Trace-Sync
```

### 2. Update OpenTelemetry Collector Config
Before running the application, update the `otel-collector-config.yaml` file located at the root of the project. You need to replace the `endpoint` and `authorization` values for the `otlphttp` exporter to match your **Observe** or other trace collector configuration:

```yaml
exporters:
  otlphttp:
    endpoint: "<YOUR_OBSERVE_ENDPOINT>"
    headers:
      authorization: "Bearer <YOUR_OBSERVE_AUTHORIZATION_TOKEN>"
```

Ensure your OpenTelemetry Collector is set up correctly with the appropriate endpoint and authorization header.

### 3. Run the Application
Build and run the application using Docker Compose:
```bash
docker compose up --build
```

This will start the frontend on `http://localhost:3000`, the backend on `http://localhost:3001`, and the OpenTelemetry Collector.

### 4. Explore the Application
- Open your browser and navigate to `http://localhost:3000`.
- The frontend will load with a simple button.
- Click the "Click Me to Trigger Backend" button.
- The frontend traces the page load and button click events and sends the trace context to the backend.

### 5. View Traces
Traces will be exported to your configured tracing backend (such as Observe, Jaeger, or Zipkin). You can use these to explore spans and see how frontend and backend traces are connected.

### 6. Stopping the Application
To stop all services, run:
```bash
docker compose down
```

## How it Works

### Frontend (React)
- The frontend uses OpenTelemetry’s web tracer to instrument the page load and button click events.
- The trace context is propagated through HTTP headers when calling the backend API.
- The OpenTelemetry collector collects traces and forwards them to the backend.

### Backend (Node.js)
- The backend uses the Node.js OpenTelemetry SDK to trace API requests and link the incoming trace context with its operations.
- Each trace can be followed from the frontend button click to the backend data processing and response.

### OpenTelemetry Collector
- The collector gathers all traces and sends them to a tracing backend for visualization.
