# EasySeeking - AI-Powered Resume Builder

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Folder Structure](#4-folder-structure)
5. [Major Components](#5-major-components-and-their-roles)
6. [Database Schema](#6-database-schema-design)
7. [API Endpoints](#7-rest-api-endpoints)
8. [AI Integration](#8-ai-integration)
9. [Deployment](#9-deployment--environment)
10. [Challenges](#10-challenges--design-decisions)
11. [Future Scope](#11-future-scope)
12. [Prototype Showcase](#12-prototype-showcase)

## 1. Project Overview

EasySeeking is a modern, AI-powered resume builder platform that helps users create professional resumes quickly and effectively. The platform leverages Google's Gemini 1.5 Flash AI to provide intelligent suggestions and content generation for resume sections.

### Target Users
- Job seekers looking to create professional resumes
- Career changers needing to update their resumes
- Students entering the job market
- Professionals seeking to optimize their resumes

### Problem Solved
- Simplifies the resume creation process
- Provides AI-powered content suggestions
- Ensures professional formatting and structure
- Reduces time spent on resume creation
- Helps users create ATS-friendly resumes

## 2. System Architecture

The system follows a modern full-stack architecture with clear separation of concerns:

### Frontend (React + Vite)
- Client-side application built with React
- Vite for fast development and building
- TailwindCSS for styling
- Clerk for authentication
- React Router for navigation

### Backend (Strapi)
- Headless CMS built with Strapi
- RESTful API endpoints
- PostgreSQL database
- User permissions and authentication
- Content management system

### AI Integration
- Google Gemini 1.5 Flash integration
- AI-powered content generation
- Intelligent suggestions for resume sections

### Data Flow
1. User interacts with frontend
2. Frontend makes API calls to Strapi backend
3. Backend processes requests and interacts with database
4. AI services are called when needed for content generation
5. Responses are sent back to frontend
6. Frontend updates UI based on responses

## 3. Tech Stack

### Frontend
- React 19
- Vite 6.2.0
- TypeScript 5.7.2
- TailwindCSS 4.1.4
- Clerk Authentication
- Radix UI Components
- Axios for API calls
- React Router DOM 6.30.0

### Backend
- Strapi 5.12.3
- PostgreSQL
- TypeScript
- Node.js (v18+)

### AI & External Services
- Google Gemini 1.5 Flash
- Clerk Authentication
- PostgreSQL Database

### Development Tools
- ESLint
- PostCSS
- TypeScript
- Vite
- Strapi CLI

## 4. Folder Structure

### Frontend (`/frontend`)
```
frontend/
├── src/
│ ├── components/ # Reusable UI components
│ ├── Pages/ # Page components
│ ├── context/ # React context providers
│ ├── lib/ # Utility functions and helpers
│ ├── auth/ # Authentication related code
│ ├── my-resume/ # Resume specific components
│ ├── assets/ # Static assets
│ └── data/ # Data and constants
├── public/ # Public assets
└── service/ # API service layer
```

### Backend (`/strapi-backend`)
```
strapi-backend/
├── src/
│ ├── api/ # API endpoints and controllers
│ ├── components/ # Reusable components
│ ├── extensions/ # Strapi extensions
│ └── admin/ # Admin panel customization
├── config/ # Configuration files
└── database/ # Database migrations and seeds
```


## 5. Major Components and Their Roles

### Frontend Components

#### Pages
- Home: Landing page and main dashboard
- Resume Builder: Main resume creation interface
- Templates: Resume template selection
- Profile: User profile management

#### Components
- UI Components: Reusable UI elements (buttons, forms, etc.)
- Resume Components: Specific resume-related components
- Layout Components: Page layouts and navigation

#### Context
- Auth Context: Authentication state management
- Resume Context: Resume data and state management

#### Services
- API Service: Handles all backend communication
- AI Service: Manages AI-related functionality

### Backend Components

#### Content Types
- User: User profile and authentication
- Resume: Resume data and structure
- Template: Resume templates
- Section: Resume sections

#### Controllers
- Resume Controller: Handles resume CRUD operations
- Template Controller: Manages template operations
- User Controller: Handles user-related operations

#### Services
- AI Service: Integrates with Gemini AI
- Resume Service: Business logic for resume operations

## 6. Database Schema Design

### Content Types

#### User
- id: UUID
- email: String
- name: String
- resumes: Relation (One-to-Many with Resume)

#### Resume
- id: UUID
- title: String
- content: JSON
- template: Relation (Many-to-One with Template)
- user: Relation (Many-to-One with User)
- sections: Relation (One-to-Many with Section)

#### Template
- id: UUID
- name: String
- description: String
- preview: String
- resumes: Relation (One-to-Many with Resume)

#### Section
- id: UUID
- type: String
- content: JSON
- resume: Relation (Many-to-One with Resume)

## 7. REST API Endpoints

### Authentication
- POST /auth/login
- POST /auth/register
- GET /auth/me

### Resume Management
- GET /resumes
- POST /resumes
- GET /resumes/:id
- PUT /resumes/:id
- DELETE /resumes/:id

### Template Management
- GET /templates
- GET /templates/:id

### AI Services
- POST /ai/generate-content
- POST /ai/optimize-resume

## 8. AI Integration

### Gemini 1.5 Flash Usage
- Content generation for resume sections
- Resume optimization suggestions
- ATS compliance checking
- Skills and experience enhancement

### AI-Assisted Features
1. Resume Content Generation
   - Professional summaries
   - Work experience descriptions
   - Skills suggestions
   - Achievement highlights

2. Resume Optimization
   - ATS optimization
   - Keyword suggestions
   - Formatting improvements
   - Content enhancement

### AI Flow
1. User input → Frontend
2. Frontend → Backend API
3. Backend → Gemini AI
4. AI Processing
5. Response → Backend
6. Backend → Frontend
7. Frontend Display

## 9. Deployment & Environment

### Local Setup

#### Frontend
1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start development server: `npm run dev`

#### Backend
1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env` file with required variables
4. Start development server: `npm run develop`

### Environment Variables

#### Frontend (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_STRAPI_API_KEY=
VITE_GOOGLE_AI_API_KEY=
VITE_API_URL=
```

#### Backend (.env)
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
```

### External Services
- Clerk Authentication
- PostgreSQL Database
- Google Cloud (Gemini AI)
- Render (Deployment)

## 10. Challenges & Design Decisions

### Challenges Addressed
1. Real-time AI Integration
   - Implemented efficient API calls
   - Added caching for common requests
   - Optimized response handling

2. User Experience
   - Implemented progressive loading
   - Added auto-save functionality
   - Created intuitive UI/UX

3. Performance
   - Optimized database queries
   - Implemented efficient state management
   - Added proper error handling

### Key Design Decisions
1. Strapi Backend
   - Chosen for rapid development
   - Built-in authentication
   - Flexible content management

2. React + Vite Frontend
   - Fast development experience
   - Excellent TypeScript support
   - Modern tooling

3. TailwindCSS
   - Utility-first approach
   - Rapid development
   - Consistent styling

## 11. Future Scope

### Planned Improvements
1. Enhanced AI Features
   - More sophisticated content generation
   - Better ATS optimization
   - Industry-specific suggestions

2. User Experience
   - Mobile app version
   - Offline support
   - More template options

3. Technical Improvements
   - GraphQL API
   - Real-time collaboration
   - Advanced analytics

4. Additional Features
   - Cover letter generation
   - LinkedIn profile optimization
   - Job matching suggestions
   - Interview preparation tools

  ## 12. Prototype Showcase

### User Interface Screenshots

#### Landing Page
![Landing Page](docs/images/landing-page.png)
*Caption: The landing page showcases the main features and value proposition of EasySeeking.*

#### Dashboard
![Dashboard](docs/images/dashboard.png)
*Caption: User dashboard showing saved resumes and quick actions.*

#### Resume Builder
![Resume Builder](docs/images/resume-builder.png)
*Caption: The main resume creation interface with AI-powered suggestions.*

#### Template Selection
![Templates](docs/images/templates.png)
*Caption: Various professional resume templates available for users.*

#### AI Suggestions
![AI Suggestions](docs/images/ai-suggestions.png)
*Caption: AI-powered content suggestions for resume sections.*

### Interactive Demo Videos

#### Creating a Resume
[![Create Resume Demo](docs/videos/create-resume-thumbnail.png)](docs/videos/create-resume.mp4)
*Caption: Step-by-step process of creating a resume with AI assistance.*

#### AI Content Generation
[![AI Generation Demo](docs/videos/ai-generation-thumbnail.png)](docs/videos/ai-generation.mp4)
*Caption: Demonstration of AI-powered content generation for resume sections.*

#### Template Customization
[![Template Customization Demo](docs/videos/template-customization-thumbnail.png)](docs/videos/template-customization.mp4)
*Caption: How to customize and personalize resume templates.*

### User Flow Diagrams

#### Resume Creation Flow
![Resume Creation Flow](docs/diagrams/resume-creation-flow.png)
*Caption: Step-by-step flow of the resume creation process.*

#### AI Integration Flow
![AI Integration Flow](docs/diagrams/ai-integration-flow.png)
*Caption: How AI is integrated into the resume creation process.*
