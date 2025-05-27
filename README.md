# Slack Clone (Learning Project)

This is a Slack-like chat application built as a learning project to explore **GraphQL** and **RabbitMQ** integration in a modern web stack. The project is not fully developed and is intended for educational purposes.

## Tech Stack

- **Backend:** Laravel (PHP) with GraphQL API ([apiserver](apiserver/README.md))
- **Frontend:** React.js (Next.js) ([app](app/README.md))
- **Messaging:** RabbitMQ (for real-time message delivery)
- **Other Services:** Redis, MySQL (via Docker Compose)

## Features (Implemented & In Progress)

- User authentication (login & registration)
- Workspaces and channels (create, list, join)
- Channel messaging (via GraphQL mutations and RabbitMQ)
- Real-time updates using RabbitMQ and WebSockets
- Containerized development environment with Docker

## Project Structure

- [`apiserver/`](apiserver/README.md): Laravel backend with GraphQL and RabbitMQ integration
- [`app/`](app/README.md): React/Next.js frontend
- [`docker/`](docker/): Docker configs for RabbitMQ, MySQL, Redis, etc.
- [`docker-compose.yml`](docker-compose.yml): Multi-service orchestration

## Getting Started

1. **Clone the repository**
2. **Start services with Docker Compose**

   ```sh
   docker-compose up --build

   ```

## Status

This project is a work in progress and not production-ready. Contributions and suggestions are welcome!

## Main motivation

To learn and experiment with GraphQL and RabbitMQ in a full-stack environment.

## Next

Build something similar in RUST and GoLang
