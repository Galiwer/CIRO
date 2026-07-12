# CIRO Phone Store Platform

CIRO is a full-stack web application for a mobile phone business. It provides product catalog management, firmware management, FAQ management, repair tracking, and role-based user management.

The platform combines a customer-facing experience with an internal operations dashboard. Public users can browse products, track repair status, and find support content, while administrators can manage inventory content, firmware files, repair workflows, and user accounts from protected routes.

## What The Project Can Do

CIRO supports day-to-day mobile store operations in one place:

- Publish and maintain an online product catalog with pricing, categories, descriptions, and images.
- Offer firmware resources by brand/model so users can find and download relevant files.
- Provide a searchable support experience through curated FAQ entries.
- Track repair jobs using unique job numbers, reducing support calls for basic status updates.
- Protect sensitive operations with JWT-based authentication and role-based access control.
- Allow administrators to maintain users and operational data without direct database edits.

## User Roles And Capabilities

### Public User (No Login)
- View home/about pages and browse product information.
- Open product details pages to inspect device-specific data.
- View published FAQ content.
- Enter a repair/job number and check status updates.
- Browse firmware lists and download relevant files (based on available endpoints and UI access).

### Authenticated User
- Sign in and keep an active session with token-based auth.
- Access personal profile information.

### Admin
- Create, edit, and delete products (including image uploads).
- Add/edit/delete FAQ entries and control published support content.
- Upload, view, list, and remove firmware files.
- Create/update/delete repair jobs and move jobs through status stages.
- Register/manage users, update user records, and remove users when needed.

## Typical End-To-End Workflows

### 1) Product Management Workflow
1. Admin signs in.
2. Admin creates a product with metadata and image.
3. Product becomes visible in public product listings.
4. Admin can later update price/details or remove the product.

### 2) Repair Tracking Workflow
1. Staff creates a repair job and generates a job number.
2. Job status is updated over time (for example, queued to in-progress to completed).
3. Customer enters the job number on the tracking page.
4. Customer receives the current repair state without contacting support.

### 3) Firmware Distribution Workflow
1. Admin uploads firmware and associates it with brand/model information.
2. Users browse firmware by brand/model.
3. Users view or download the selected firmware package.

### 4) Customer Support Workflow (FAQ)
1. Admin adds or updates support Q&A entries.
2. Public FAQ page reflects published entries.
3. Users self-serve answers for common issues.

## Why This Project Is Useful

- Improves customer experience through self-service features (tracking + FAQ + firmware access).
- Reduces manual staff workload by centralizing repetitive tasks.
- Keeps data and admin operations secure with authentication and authorization.
- Provides a practical full-stack reference project that combines CRUD, file handling, auth, and role-based routing.

## Project Structure

- `frontend/` - React + Vite single-page application
- `backend/phonestore/` - Spring Boot REST API with MySQL
- `backend/Dockerfile` - container build for backend service

## Tech Stack

### Frontend
- React 19
- Vite 6
- React Router
- Bootstrap 5
- Axios

### Backend
- Java 17
- Spring Boot 3.2
- Spring Web, Spring Security, Spring Data JPA, Validation
- MySQL
- JWT authentication

## Core Features

- Public product browsing and product details
- Admin product CRUD with image upload
- Firmware upload, listing, download, and admin management
- FAQ publishing and admin FAQ management
- Repair job tracking by job number
- User registration/login with role-based access (Admin/User)
- Admin user management and profile management

## Prerequisites

Install these tools before running locally:

- Node.js 18+ and npm
- Java 17
- Maven (or use the included `mvnw` wrapper)
- MySQL 8+

## Local Development Setup

## 1) Clone and enter project

```bash
git clone <your-repo-url>
cd CIRO
```

## 2) Configure MySQL

Create a database:

```sql
CREATE DATABASE phonestore;
```

Default development database settings are read from `backend/phonestore/src/main/resources/application.properties`:

- URL: `jdbc:mysql://localhost:3306/phonestore`
- Username: `root`
- Password: empty by default

Update the values in `application.properties` if your local MySQL setup is different.

## 3) Run backend

From project root:

```bash
cd backend/phonestore
./mvnw spring-boot:run
```

On macOS/Linux use `./mvnw`, on Windows use `mvnw.cmd`.

Backend default URL:

- `http://localhost:8080`

## 4) Run frontend

Open a second terminal from project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

- `http://localhost:5173`

## Frontend Environment Variables

The frontend reads these optional variables:

- `VITE_API_URL` - backend base URL (default points to deployed Railway backend)
- `VITE_IMAGE_URL` - image base URL (defaults to `${VITE_API_URL}/images`)

Create `frontend/.env` for local development:

```env
VITE_API_URL=http://localhost:8080
VITE_IMAGE_URL=http://localhost:8080/images
```

## Backend Configuration Notes

Important backend properties:

- Active profile controlled by `RAILWAY_ENVIRONMENT` (defaults to `dev`)
- Development CORS allows `http://localhost:5173`
- Upload directory defaults to `${user.home}/phonestore/firmware-uploads`
- JWT settings are defined in `application-prod.properties`

## Useful Scripts

Frontend (`frontend/package.json`):

```bash
npm run dev      # start development server
npm run build    # production build
npm run preview  # preview built app
npm run lint     # lint source
```

Backend:

```bash
./mvnw test
./mvnw clean package
```

## API Areas (High-Level)

- Products: `/api/products/...`
- Firmware: `/api/firmware/...`
- FAQs: `/api/faqs/...`
- Repair Jobs: `/api/jobs/...`
- Auth/User management: `/auth/...`, `/admin/...`, `/adminuser/...`

## Deployment Notes

- Frontend includes `vercel.json` for Vercel deployment.
- Backend production profile uses environment-based MySQL config and is prepared for Railway-style deployment.
- A backend container definition is available at `backend/Dockerfile`.

## Troubleshooting

- If frontend cannot reach backend, verify `VITE_API_URL` and backend port.
- If login/protected pages fail, check token presence in browser local storage.
- If file uploads fail, verify upload directory permissions.
- If CORS errors occur, ensure backend `spring.mvc.cors.allowed-origins` includes your frontend origin.

## License

Add your preferred license for this project in this section.
