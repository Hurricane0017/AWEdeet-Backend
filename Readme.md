# Influencer Management System

A modern RESTful API for managing influencer data, built with Node.js, Express.js, and PostgreSQL. This system provides comprehensive CRUD operations for influencer profiles, tracking social media metrics, demographic information, and automatically calculating engagement rates.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Data Validation](#data-validation)
- [Contributing](#contributing)
- [License](#license)

## Features

- ✨ Complete CRUD operations for influencer profiles
- 📊 Automatic engagement rate calculations
- 🔒 Data validation and sanitization
- 📱 Social media metrics tracking
- 👥 Demographic information management
- 🚀 Real-time updates
- 💽 Automated database setup

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: node-postgres (pg)
- **Development**: nodemon, dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/Hurricane0017/AWEdeet-Backend.git
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**

Copy the demo environment file:
```bash
cp .env.demo .env
```

The demo configuration includes:
```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=postgres
DB_SERVER=localhost
DB_DATABASE=influencers
DB_TRUST_CERT=true           # Use only for development
DB_PORT=5432
DB_POOL_MODE=transaction
PORT = 5003
```

4. **Start the Application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will automatically:
- Create the database if it doesn't exist
- Set up required tables
- Configure necessary constraints and indexes

## API Documentation

### 1. Create Influencer
```http
POST /influencers
```
**Request Body:**
```json
{
  "name": "John Doe",
  "instagram_handle": "johndoe_ig",
  "likes": 1200,
  "comments": 150,
  "shares": 70,
  "Followers": 1420,
  "age_range": "25-34",
  "gender": "Male"
}
```
**Response:** `201 Created`
```json
{
    "message": "Influencer added successfully",
    "newInfluencer": {
        "id": 13,
        "name": "William Harris",
        "instagram_handle": "@willhar",
        "likes": 1300,
        "comments": 100,
        "shares": 70,
        "followers": 1600,
        "engagement_rate": "0.00",
        "age_range": "45+",
        "gender": "Male",
        "created_at": "2024-12-27T04:28:55.362Z",
        "updated_at": "2024-12-27T04:28:55.362Z"
    }
}
```

### 2. Get Influencer
```http
GET /influencers/:id
```
**Response:** `200 OK`
```json
{
    "influencer_id": 13,
    "name": "William Harris",
    "instagram_handle": "@willhar",
    "likes": 1300,
    "comments": 100,
    "shares": 70,
    "followers": 1600,
    "engagement_rate": "0.00",
    "age_range": "45+",
    "gender": "Male",
    "created_at": "2024-12-27T04:28:55.362Z",
    "updated_at": "2024-12-27T04:28:55.362Z"
}
```

### 3. List All Influencers
```http
GET /influencers
```
**Response:** `200 OK`
```json
{
    "message": "Influencers retrieved successfully",
    "influencers": [
        {
            "influencer_id": 1,
            "name": "John Doe",
            "instagram_handle": "@johndoe",
            "likes": 1000,
            "comments": 100,
            "shares": 50,
            "followers": 1150,
            "engagement_rate": "1.00",
            "age_range": "18-24",
            "gender": "Male",
            "created_at": "2024-12-27T03:36:10.797Z",
            "updated_at": "2024-12-27T03:36:10.797Z"
        }
    ]
}
```

### 4. Update Influencer
```http
PUT /influencers/:id
```
**Request Body:**
```json
{
  "likes": 1500,
  "comments": 200,
  "shares": 85,
  "Followers": 1600
}
```
**Response:** `200 OK`
```json
{
    "message": "Influencer updated successfully",
    "updatedInfluencer": {
        "id": 13,
        "name": "William Harris",
        "instagram_handle": "@willhar",
        "likes": 1200,
        "comments": 150,
        "shares": 70,
        "followers": 1420,
        "engagement_rate": "1.00",
        "age_range": "45+",
        "gender": "Male",
        "created_at": "2024-12-27T04:28:55.362Z",
        "updated_at": "2024-12-27T04:30:49.129Z"
    }
}
```

### 5. Delete Influencer
```http
DELETE /influencers/:id
```
**Response:** `204 No Content`

## Data Validation

The API enforces the following validation rules:

### Required Fields
- name (string)
- instagram_handle (string, unique)
- likes (positive integer)
- comments (positive integer)
- shares (positive integer)
- Followers (positive integer, > 0)
- age_range (enum: "18-24", "25-34", "35-44", "45+")
- gender (enum: "Male", "Female", "Other")

### Automatic Calculations
- engagement_rate: (likes + comments + shares) / followers

### Error Responses
- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate instagram handle
- `500 Internal Server Error`: Server-side issues

## Example Usage

### Creating an Influencer Profile
```javascript
const response = await fetch('http://localhost:5000/influencers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Jane Smith",
    instagram_handle: "janesmith_official",
    likes: 2500,
    comments: 300,
    shares: 150,
    Followers: 5000,
    age_range: "25-34",
    gender: "Female"
  })
});

const data = await response.json();
```

### Updating Metrics
```javascript
const response = await fetch('http://localhost:5000/influencers/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    likes: 3000,
    comments: 400,
    shares: 200,
    Followers: 5500
  })
});

const data = await response.json();
```

## Error Handling

The API provides detailed error messages:
```json
{
  "message": "Validation failed",
  "errors": [
    "Instagram handle is already in use",
    "Followers must be greater than 0"
  ]
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


