# Project clothing donations

This is a fictitious university project to make clothing donations more digital and give users a web-based interaction point.
The project aims to serve users a webpage using modern css and javascript frameworks alongside with a responsive design to enable them donating cloths to a selected crisis area.
No data will be saved nor any real donation will be created.

**Live preview:** https://project-clothing-donations-515906903315.europe-west4.run.app/

## Description

This project is a single-page application built with React 19, TypeScript, Vite 7, Tailwind CSS v4, and React Router v6. It features a multi-step donation form with client-side validation and sanitization, a glassmorphism design system, and fully responsive mobile-first layouts. The project follows a test-driven development approach using Mocha for utility-level unit tests.

## Getting started

**Prerequisites:** Node.js 20+

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Production build

```bash
npm run build   # compile + bundle
npm run preview # serve the build locally
```

## Docker

**Prerequisites:** Docker

### Build the image

```bash
docker build -t project-clothing-donations:latest .
```

### Run the container

```bash
docker run -d --name clothing-donations-web -p 8080:80 project-clothing-donations:latest
```

The app is then available at [http://localhost:8080](http://localhost:8080).

For production deployments it is recommended to run the container behind a reverse proxy that handles HTTPS termination.
