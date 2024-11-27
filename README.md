# Server: Backend API with Prisma

This directory contains the server-side implementation of the application. It uses **Prisma** as the ORM to interact with the database, providing a type-safe and efficient way to handle database operations.

## Features

- **Prisma ORM**: Type-safe database queries with auto-generated types.
- **CRUD Operations**: Fully implemented CRUD functionality for managing products.
- **REST API**: Endpoints to create, read, update, and delete resources.
- **MONGODB Support**: Configured for a MONGODB database but easily adaptable to other relational databases.
- **Environment Variables**: Centralized configuration for secure and flexible setup.

## Prerequisites

Before starting, ensure you have the following installed:
- **BUN** (v16 or later)
- **MONGODB** (or your preferred relational database)
- **Prisma CLI** (installed as a development dependency)

## Getting Started

Follow these steps to set up and run the server:

### 1. Install Dependencies

Run the following command in the `/server` directory to install all required dependencies:

```bash
bun install

npx prisma init
npx prisma generate
npx prisma migrate dev --name init



/server
├── prisma/
│   ├── schema.prisma  # Prisma schema defining the database models
├── src/
│   ├── routes/        # API route handlers
│   ├── controllers/   # Business logic
│   ├── middlewares/   # Middleware for validation, error handling, etc.
│   ├── index.ts       # Server entry point
├── .env               # Environment variables
├── package.json       # Node.js dependencies and scripts

API Endpoints
1. Create Product
POST /products

Request Body:

json

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100
}
Response:

json

{
  "product": {
    "id": "1",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100
  }
}
2. Get All Products
GET /products

Response:
json

{
  "products": [
    {
      "id": "1",
      "name": "Product Name",
      "description": "Product Description",
      "price": 100
    }
  ]
}
3. Update Product
PUT /products/:id

Request Body:

json

{
  "name": "Updated Name",
  "description": "Updated Description",
  "price": 200
}
Response:

json

{
  "product": {
    "id": "1",
    "name": "Updated Name",
    "description": "Updated Description",
    "price": 200
  }
}
4. Delete Product
DELETE /products/:id

Response:
json

{
  "message": "Product deleted successfully"
}
Project Structure


/server
├── prisma/
│   ├── schema.prisma  # Prisma schema defining the database models
├── src/
│   ├── routes/        # API route handlers
│   ├── controllers/   # Business logic
│   ├── middlewares/   # Middleware for validation, error handling, etc.
│   ├── index.ts       # Server entry point
├── .env               # Environment variables
├── package.json       # Node.js dependencies and scripts
Technologies Used
Prisma: ORM for database interaction
Express.js: Minimalist web framework
PostgreSQL: Database management system
TypeScript: Type-safe programming
Additional Commands
Format Prisma Schema:


npx prisma format
View Database in Prisma Studio:


npx prisma studio
Contributing
Feel free to contribute to this project by submitting issues or pull requests.

License
This project is licensed under the MIT License.

css

