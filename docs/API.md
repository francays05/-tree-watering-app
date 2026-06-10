# API Documentation - Tree Watering Monitoring App

## Base URL
```
http://localhost:5000/api
```

## Authentication

Todos os endpoints (exceto `/auth/login`) requerem o header:
```
Authorization: Bearer <token_jwt>
```

## Endpoints

### Authentication

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "contractor1",
  "password": "password123"
}

Response (200):
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "contractor1",
    "name": "John Smith",
    "companyId": 1
  }
}
```

### Trees

#### Get All Trees
```
GET /trees

Response (200):
[
  {
    "id": 1,
    "tree_id": "LF-T0001",
    "ward": "Lime Grove Ward",
    "species": "Quercus robur",
    "status": "Active",
    ...
  }
]
```

#### Get Single Tree
```
GET /trees/:treeId

Response (200):
{
  "id": 1,
  "tree_id": "LF-T0001",
  ...
}
```

#### Create Tree
```
POST /trees
Content-Type: application/json

{
  "tree_id": "LF-T0001",
  "ward": "Lime Grove Ward",
  "species": "Quercus robur",
  "planting_date": "2024-03-15",
  ...
}
```

### Watering Visits

#### Get All Visits
```
GET /visits

Response (200):
[
  {
    "id": 1,
    "tree_id": 1,
    "visit_datetime": "2024-06-10T14:30:00",
    "condition": "Good",
    "photo_url": "/uploads/uuid.jpg",
    ...
  }
]
```

#### Get Visits for Tree
```
GET /visits/tree/:treeId
```

#### Record New Visit
```
POST /visits
Content-Type: multipart/form-data

Parameters:
- tree_id: 1
- condition: "Good"
- recommendation: "Continue monitoring"
- notes: "Tree looks healthy"
- photo: <file>

Response (201):
{
  "id": 1,
  "tree_id": 1,
  "visit_datetime": "2024-06-10T14:35:00",
  ...
}
```

### Dashboard

#### Get Metrics
```
GET /dashboard/metrics

Response (200):
{
  "totalTrees": 150,
  "totalVisits": 450,
  "completedVisits": 350,
  "overdueCount": 12,
  "visitsByWard": [
    {"ward": "Lime Grove", "visits": 45},
    ...
  ],
  ...
}
```

## Error Responses

```
400 Bad Request
{
  "error": "Username and password required"
}

401 Unauthorized
{
  "error": "Invalid credentials"
}

500 Internal Server Error
{
  "error": "Server error"
}
```