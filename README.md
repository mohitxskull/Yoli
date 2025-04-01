# Yoli - Project Portfolio Application

Yoli is a full-stack web application built as a monorepo using Turborepo. It features a Next.js frontend and an Express.js backend with a MySQL database managed by Drizzle ORM. The application allows users to view a portfolio of projects, save their favorite projects, and add new projects via a form.

## Key Features

*   **Monorepo:** Managed with Turborepo and pnpm for efficient development and building.
*   **Backend (Express.js + Drizzle ORM):**
    *   RESTful API for managing projects.
    *   CRUD operations for projects (Create, Read, Update, Delete).
    *   Functionality to "save" projects (like a favorites or cart system).
    *   Uses Drizzle ORM for type-safe database interactions with MySQL.
    *   Input validation using Zod.
    *   Pagination support for fetching projects.
*   **Frontend (Next.js + React Query):**
    *   Displays a portfolio of projects fetched from the backend.
    *   Allows users to view saved projects.
    *   Provides a form to add new projects.
    *   Uses React Query for efficient data fetching, caching, and state management.
    *   Styled with Tailwind CSS and shadcn/ui components.
    *   Responsive layout for desktop and mobile.

## Tech Stack

*   **Monorepo:** Turborepo, pnpm
*   **Backend:** Node.js, Express, TypeScript, Drizzle ORM, MySQL, Zod, dotenv
*   **Frontend:** Next.js (Pages Router), React, TypeScript, Tailwind CSS, shadcn/ui, React Query, Axios, Zod (@t3-oss/env-nextjs)

## Prerequisites

*   Node.js (Version `>=20` as specified in `Yoli/package.json`)
*   pnpm (Version `9.15.1` as specified in `Yoli/package.json`)
*   A running MySQL database instance.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mohitxskull/Yoli
    cd Yoli
    ```

2.  **Install dependencies:**
    Install dependencies for the entire monorepo from the root directory.
    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**
    *   **Backend:** Create a `.env` file in the `Yoli/backend` directory. Add the following variables:
        ```dotenv
        DATABASE_URL="mysql://user:password@host:port/database_name"
        # Optional: Define the port the backend server runs on (defaults to 3001 if not set)
        # PORT=3001
        # Optional: Set the allowed origin for CORS (defaults to http://localhost:3000 if not set)
        # FRONTEND_URL=http://localhost:3000
        ```
        Replace the `DATABASE_URL` with your actual MySQL connection string.

    *   **Frontend:** Create a `.env.local` file in the `Yoli/frontend` directory (optional, defaults are provided).
        ```dotenv
        # Optional: Override the default backend URL
        # NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api
        ```
        The default backend URL used by the frontend is `http://localhost:3001/api`.

4.  **Database Setup:**
    Navigate to the backend directory and run the Drizzle Kit command to push the schema to your database.
    ```bash
    cd backend
    pnpm db:push
    cd ..
    ```
    *Note: `db:generate` creates migration files (useful for production workflows), while `db:push` directly applies schema changes (simpler for development).*

## Running the Project

Start both the frontend and backend development servers concurrently from the **root** directory:

```bash
pnpm dev
```

*   The **Backend** will typically run on `http://localhost:3001` (or the `PORT` specified in `backend/.env`).
*   The **Frontend** will run on `http://localhost:3000`.

Open `http://localhost:3000` in your browser to view the application.

## Available Scripts (Root)

*   `pnpm dev`: Starts both frontend and backend development servers.
*   `pnpm build`: Builds both frontend and backend applications for production.
*   `pnpm lint`: Lints the codebase in both packages.
*   `pnpm format`: Formats the code using Prettier.
*   `pnpm check`: Runs format, lint, and typecheck across the monorepo.