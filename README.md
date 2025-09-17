# 🚀 NestJS CRUD API with Unit & E2E Testing

![Build Status](https://github.com/anuj607/nestjs-crud-testing/actions/workflows/test.yml/badge.svg)

A sample **NestJS CRUD API** with **DTO validation**, **unit tests**, and **end-to-end (E2E) tests** using **Jest** and **Supertest**.  
This project demonstrates best practices for **backend testing** and **continuous integration (CI)** with GitHub Actions.  

---

## 📂 Project Structure

```
nestjs-crud-testing/
├── src/
│   ├── users/                # Users module
│   │   ├── dto/              # DTOs with class-validator
│   │   ├── user.entity.ts    # User entity
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
│   ├── users.e2e-spec.ts     # End-to-End tests
│   └── jest-e2e.json
├── users.service.spec.ts      # Unit tests
├── jest.config.js             # Jest config for unit tests
├── package.json
└── .github/workflows/test.yml # GitHub Actions CI
```

---

## ⚡ Features

- ✅ **CRUD APIs**: Create, Read, Update, Delete users  
- ✅ **DTO Validation** with `class-validator`  
- ✅ **Unit Tests** with Jest  
- ✅ **End-to-End Tests** with Supertest  
- ✅ **Error Handling** (404 Not Found, 409 Conflict, 400 Bad Request)  
- ✅ **GitHub Actions CI/CD** for automated testing  

---

## 🛠️ Tech Stack

- [NestJS](https://nestjs.com/) (v9)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Jest](https://jestjs.io/) for unit & e2e testing  
- [Supertest](https://www.npmjs.com/package/supertest) for HTTP request testing  
- [class-validator](https://github.com/typestack/class-validator) for input validation  
- GitHub Actions for CI/CD  

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/anuj607/nestjs-crud-testing.git
cd nestjs-crud-testing
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the app
```bash
npm run start:dev
```
Server runs at 👉 [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### Create User
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Get All Users
```http
GET /users
```

### Get User by ID
```http
GET /users/:id
```

### Update User
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "Updated Name"
}
```

### Delete User
```http
DELETE /users/:id
```

---

## 🧪 Running Tests

### Unit Tests
```bash
npm run test
```

### End-to-End (E2E) Tests
```bash
npm run test:e2e
```

### Run only a specific test file
```bash
npm run test:e2e -- test/users.e2e-spec.ts
```

### Run specific test case by name
```bash
npm run test:e2e -- test/users.e2e-spec.ts -t "create user"
```

### Coverage Report
```bash
npm run test:cov
```

---

## ⚙️ GitHub Actions CI

This repo includes a **CI workflow** in `.github/workflows/test.yml`.  
On every **push or pull request**, GitHub Actions will:  
- Install dependencies  
- Run **unit tests**  
- Run **E2E tests**  
- Upload the coverage report  

---

## 🎯 What This Project Demonstrates

- Clean **CRUD API** design in NestJS  
- **DTO validation** with `class-validator`  
- Writing **unit tests** for services with edge cases  
- Writing **E2E tests** simulating real API calls with `supertest`  
- Setting up **GitHub Actions CI/CD** for automated testing  

---

## 👨‍💻 Author

**Anuj Kumar**  
Full Stack Developer | TypeScript | Node.js | React | NestJS | GenAI | Web3  

🔗 [GitHub](https://github.com/anuj607)  
