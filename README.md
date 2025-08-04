# NewsHub - News Website

A modern news website built with Angular frontend, NestJS backend, and MongoDB database.

## Features

- **Public News Portal**: Browse and read news articles
- **Admin Panel**: Manage articles, categories, and users
- **Responsive Design**: Modern UI with excellent UX
- **Real-time Updates**: Live news updates
- **Search & Filter**: Advanced search functionality

## Tech Stack

- **Frontend**: Angular 17, Angular Material, RxJS
- **Backend**: NestJS, TypeScript, MongoDB
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **Styling**: Tailwind CSS, Angular Material

## Project Structure

```
NewsHub/
├── frontend/          # Angular application
├── backend/           # NestJS API
├── shared/            # Shared types and utilities
└── docs/              # Documentation
```

## Quick Start

1. **Install dependencies**:
   ```bash
   npm run install:all
   ```

2. **Set up MongoDB**:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `newshub`

3. **Environment Setup**:
   - Copy `.env.example` to `.env` in backend folder
   - Update database connection string

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - Admin Panel: http://localhost:4200/admin

## Development

- **Frontend**: `npm run dev:frontend`
- **Backend**: `npm run dev:backend`
- **Both**: `npm run dev`

## Build

```bash
npm run build
```

## API Documentation

The API documentation is available at `http://localhost:3000/api` when the backend is running. # suno-desh-full
