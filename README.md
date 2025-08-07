# CitizenConnect360 Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Routes (`/api/auth`)

### Register User
**POST** `/api/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CITIZEN"
  }
}
```

### Login User
**POST** `/api/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-string",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "CITIZEN"
  }
}
```

### Logout User
**POST** `/api/auth/logout`

Logs out the current user.

**Response:**
```json
{
  "message": "Logout successful"
}
```

---

## Admin Routes (`/api/admin`)
*Requires ADMIN role*

### Promote User to Admin
**POST** `/api/admin/promote`

**Headers:** `Authorization: Bearer <admin-jwt-token>`

**Request Body:**
```json
{
  "userId": "user-id-to-promote"
}
```

**Response:**
```json
{
  "message": "User promoted to admin successfully"
}
```

### Get All Users
**GET** `/api/admin/users`

**Headers:** `Authorization: Bearer <admin-jwt-token>`

**Response:**
```json
{
  "users": [
    {
      "id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CITIZEN",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Incident Routes (`/api/incidents`)

### Create Incident
**POST** `/api/incidents/create`

**Headers:** `Authorization: Bearer <jwt-token>`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `title` (string): Incident title
- `description` (string): Incident description
- `location` (string): Location of the incident
- `category` (string): Incident category
- `media` (file, optional): Image or video file

**Response:**
```json
{
  "message": "Incident created successfully",
  "incident": {
    "id": "incident-id",
    "title": "Road Pothole",
    "description": "Large pothole on Main Street",
    "location": "Main Street, Downtown",
    "category": "INFRASTRUCTURE",
    "status": "PENDING",
    "mediaUrl": "/uploads/media/filename.jpg"
  }
}
```

### Update Incident Status
**PATCH** `/api/incidents/update-status`

*Requires ADMIN role*

**Headers:** `Authorization: Bearer <admin-jwt-token>`

**Request Body:**
```json
{
  "incidentId": "incident-id",
  "status": "IN_PROGRESS"
}
```

**Response:**
```json
{
  "message": "Incident status updated successfully"
}
```

### Delete Incident
**DELETE** `/api/incidents/delete/:incidentId`

*Requires ADMIN role*

**Headers:** `Authorization: Bearer <admin-jwt-token>`

**Response:**
```json
{
  "message": "Incident deleted successfully"
}
```

### Get All Incidents
**GET** `/api/incidents`

**Response:**
```json
{
  "incidents": [
    {
      "id": "incident-id",
      "title": "Road Pothole",
      "description": "Large pothole on Main Street",
      "location": "Main Street, Downtown",
      "category": "INFRASTRUCTURE",
      "status": "PENDING",
      "mediaUrl": "/uploads/media/filename.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "reporter": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  ]
}
```

### Get Incident by ID
**GET** `/api/incidents/:incidentId`

**Response:**
```json
{
  "incident": {
    "id": "incident-id",
    "title": "Road Pothole",
    "description": "Large pothole on Main Street",
    "location": "Main Street, Downtown",
    "category": "INFRASTRUCTURE",
    "status": "PENDING",
    "mediaUrl": "/uploads/media/filename.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "reporter": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

---

## Poll Routes (`/api/polls`)

### Create Poll
**POST** `/api/polls/create`

**Headers:** `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "title": "New Park Location",
  "description": "Where should we build the new community park?",
  "options": ["Downtown", "Suburb A", "Suburb B"],
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "message": "Poll created successfully",
  "poll": {
    "id": "poll-id",
    "title": "New Park Location",
    "description": "Where should we build the new community park?",
    "options": [
      {
        "id": "option-id-1",
        "text": "Downtown",
        "votes": 0
      }
    ],
    "expiresAt": "2024-12-31T23:59:59.000Z"
  }
}
```

### Vote on Poll
**POST** `/api/polls/vote`

**Headers:** `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "pollId": "poll-id",
  "optionId": "option-id-1"
}
```

**Response:**
```json
{
  "message": "Vote submitted successfully"
}
```

### Get All Polls
**GET** `/api/polls`

**Response:**
```json
{
  "polls": [
    {
      "id": "poll-id",
      "title": "New Park Location",
      "description": "Where should we build the new community park?",
      "isActive": true,
      "expiresAt": "2024-12-31T23:59:59.000Z",
      "totalVotes": 25
    }
  ]
}
```

### Get Poll Details
**GET** `/api/polls/:pollId`

**Response:**
```json
{
  "poll": {
    "id": "poll-id",
    "title": "New Park Location",
    "description": "Where should we build the new community park?",
    "options": [
      {
        "id": "option-id-1",
        "text": "Downtown",
        "votes": 15
      },
      {
        "id": "option-id-2",
        "text": "Suburb A",
        "votes": 10
      }
    ],
    "expiresAt": "2024-12-31T23:59:59.000Z",
    "totalVotes": 25
  }
}
```

### Update Poll
**PATCH** `/api/polls/:pollId`

*Requires ADMIN role*

**Headers:** `Authorization: Bearer <admin-jwt-token>`

**Request Body:**
```json
{
  "title": "Updated Poll Title",
  "description": "Updated description",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

### Delete Poll
**DELETE** `/api/polls/:pollId`

*Requires ADMIN role*

**Headers:** `Authorization: Bearer <admin-jwt-token>`

---

## Document Routes (`/api/documents`)

### Upload Document
**POST** `/api/documents/upload`

**Headers:** `Authorization: Bearer <jwt-token>`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file` (file): Document file to upload
- `title` (string): Document title
- `description` (string, optional): Document description

**Response:**
```json
{
  "message": "Document uploaded successfully",
  "document": {
    "id": "document-id",
    "title": "City Budget 2024",
    "description": "Annual budget document",
    "filename": "budget-2024.pdf",
    "fileUrl": "/uploads/documents/filename.pdf",
    "uploadedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Documents
**GET** `/api/documents`

**Headers:** `Authorization: Bearer <jwt-token>`

**Response:**
```json
{
  "documents": [
    {
      "id": "document-id",
      "title": "City Budget 2024",
      "description": "Annual budget document",
      "filename": "budget-2024.pdf",
      "fileUrl": "/uploads/documents/filename.pdf",
      "uploadedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Document by ID
**GET** `/api/documents/:documentId`

**Headers:** `Authorization: Bearer <jwt-token>`

### Update Document
**PATCH** `/api/documents/:documentId`

**Headers:** `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "title": "Updated Document Title",
  "description": "Updated description"
}
```

### Delete Document
**DELETE** `/api/documents/:documentId`

**Headers:** `Authorization: Bearer <jwt-token>`

---

## Feedback Routes (`/api/feedback`)

### Create Topic
**POST** `/api/feedback/topics`

*Requires ADMIN role*

**Headers:** `Authorization: Bearer <admin-jwt-token>`

**Request Body:**
```json
{
  "title": "City Transportation",
  "description": "Share your thoughts on public transportation"
}
```

**Response:**
```json
{
  "message": "Topic created successfully",
  "topic": {
    "id": "topic-id",
    "title": "City Transportation",
    "description": "Share your thoughts on public transportation",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Topics
**GET** `/api/feedback/topics`

**Response:**
```json
{
  "topics": [
    {
      "id": "topic-id",
      "title": "City Transportation",
      "description": "Share your thoughts on public transportation",
      "feedbackCount": 15,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Submit Feedback
**POST** `/api/feedback/feedback`

**Headers:** `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "topicId": "topic-id",
  "content": "The bus service needs improvement in frequency and punctuality."
}
```

**Response:**
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    "id": "feedback-id",
    "content": "The bus service needs improvement in frequency and punctuality.",
    "submittedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Feedback for Topic
**GET** `/api/feedback/feedback/:topicId`

**Response:**
```json
{
  "feedback": [
    {
      "id": "feedback-id",
      "content": "The bus service needs improvement in frequency and punctuality.",
      "submittedAt": "2024-01-01T00:00:00.000Z",
      "author": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  ]
}
```

---

## AI Routes (`/api/ai`)

### Chat with AI
**POST** `/api/ai/chat`

**Headers:** `Authorization: Bearer <jwt-token>`

**Request Body:**
```json
{
  "message": "What are the main points in the city budget document?",
  "documentId": "document-id"
}
```

**Response:**
```json
{
  "response": "The main points in the city budget include infrastructure spending of $2M, education funding of $5M, and public safety allocation of $3M."
}
```

---

## Analysis Service Routes
*Separate Flask service running on port 8080*

### Analyze Incidents
**POST** `http://localhost:8080/analyze-incidents`

**Request Body:**
```json
{
  "incidents": [
    {
      "title": "Road Pothole",
      "description": "Large pothole on Main Street causing traffic issues"
    },
    {
      "title": "Broken Streetlight",
      "description": "Streetlight on Oak Avenue has been out for a week"
    }
  ]
}
```

**Response:**
```json
{
  "insights": "Analysis shows infrastructure maintenance is a primary concern with multiple reports of road and lighting issues. Recommend prioritizing infrastructure repairs in the downtown area."
}
```

### Analyze Feedback
**POST** `http://localhost:8080/analyze-feedback`

**Request Body:**
```json
{
  "topic": "Public Transportation",
  "feedbacks": [
    "Bus service is unreliable",
    "Need more frequent buses during rush hour",
    "Bus stops need better lighting"
  ]
}
```

**Response:**
```json
{
  "insights": "Citizens are primarily concerned with bus reliability and frequency. Safety at bus stops is also highlighted as an issue requiring attention."
}
```

### Summarize Document
**POST** `http://localhost:8080/summarize`

**Request Body:**
```json
{
  "pdf_url": "http://localhost:5000/uploads/documents/budget-2024.pdf"
}
```

**Response:**
```json
{
  "file_id": "unique-file-id",
  "summary": "This budget document outlines the city's financial plan for 2024, with major allocations for infrastructure, education, and public safety."
}
```

### Ask Question about Document
**POST** `http://localhost:8080/ask`

**Request Body:**
```json
{
  "file_id": "unique-file-id",
  "question": "How much is allocated for education?"
}
```

**Response:**
```json
{
  "answer": "The document allocates $5 million for education in the 2024 budget."
}
```

---

## Error Responses

All endpoints may return these error responses:

**400 Bad Request:**
```json
{
  "error": "Invalid request data"
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "error": "Insufficient permissions"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## File Uploads

The API supports file uploads for:
- **Incident media**: Images/videos (via `/api/incidents/create`)
- **Documents**: PDF files (via `/api/documents/upload`)

Uploaded files are served statically at:
```
http://localhost:5000/uploads/<filename>
```

---

## Docker Commands

### Development Setup
```bash
# Backend
cd backend && docker build -t backend . && docker run --name backend_container -p 5000:5000 backend

# Frontend
cd frontend && docker build -t frontend . && docker run -p 5173:5173 frontend

# Analysis Service
cd analysis && docker build -t analysis . && docker run -p 8080:8080 analysis

# Database
docker run --name postgres_db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=connect360 -p 5432:5432 -d postgres
```

### Container Management
```bash
# Check running containers
docker ps

# Check all containers
docker ps -a

# Run specific container
docker run --name backend_container -p 5000:5000 backend
```

### Database Commands
```bash
# Run migrations
npx prisma migrate dev --name add_topics_and_feedback_relation

# Deploy migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Generate Prisma client
npx prisma generate
```