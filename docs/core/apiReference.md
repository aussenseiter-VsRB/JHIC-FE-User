---
name: API Reference
relation: index.md → core/
description: API endpoint documentation for the JHIC backend at jhicbe-o5xq7he4.b4a.run
type: Enforce
---

# API Reference

## Base URL

```
https://jhicbe-o5xq7he4.b4a.run/
```

All endpoints are prefixed with `/api/v1`.

## Authentication

Authenticated endpoints require the JWT token in the request header:

```
Authorization: Bearer <token>
```

Public endpoints do not require this header.

## Role Legend

| Role | Description |
|------|-------------|
| `admin` | Administrator, full access |
| `jurnal` | Journalist/writer, can create and manage berita |
| `guru` | Teacher, can approve/reject PKL requests |
| `user` | Regular user, can create and cancel PKL requests |

---

## Auth

| Method | Path | Description | Auth | Role |
|--------|------|-------------|------|------|
| `POST` | `/auth/register` | Register a new user account | No | — |
| `POST` | `/auth/login` | Login and receive JWT token | No | — |
| `POST` | `/auth/logout` | Logout and invalidate session | Yes | — |

---

## Users

| Method | Path | Description | Auth | Role |
|--------|------|-------------|------|------|
| `GET` | `/users` | List all users | Yes | — |
| `GET` | `/users/{id}` | Get a user by ID | Yes | — |
| `POST` | `/users` | Create a new user | Yes | admin |
| `PUT` | `/users/{id}` | Update user by ID | Yes | admin |
| `PUT` | `/users/{id}/role` | Update user role | Yes | admin |
| `DELETE` | `/users/{id}` | Delete a user by ID | Yes | admin |

---

## Berita (News)

| Method | Path | Description | Auth | Role |
|--------|------|-------------|------|------|
| `POST` | `/berita` | Create a new berita | Yes | jurnal |
| `GET` | `/berita` | List all berita | No | — |
| `GET` | `/berita/{id}` | Get a berita by ID | No | — |
| `PUT` | `/berita/{id}` | Update a berita by ID | Yes | jurnal |
| `DELETE` | `/berita/{id}` | Delete a berita by ID | Yes | jurnal |
| `POST` | `/berita/{id}/image` | Upload cover image for a berita | Yes | jurnal |
| `POST` | `/berita/{id}/images` | Upload content image for a berita | Yes | jurnal |
| `DELETE` | `/berita/{id}/images` | Delete a content image from a berita | Yes | jurnal |

---

## Approval PKL

| Method | Path | Description | Auth | Role |
|--------|------|-------------|------|------|
| `POST` | `/approval/pkl` | Create a new PKL approval request | Yes | user |
| `GET` | `/approval/pkl` | List PKL approval requests | Yes | user, guru, admin |
| `GET` | `/approval/pkl/{id}` | Get a PKL approval request by ID | Yes | user, guru, admin |
| `POST` | `/approval/pkl/{id}/decide` | Approve/reject/cancel a PKL request | Yes | guru |
| `DELETE` | `/approval/pkl/{id}` | Cancel a PKL approval request | Yes | user |

---

## Nexxa AI

| Method | Path | Description | Auth | Role |
|--------|------|-------------|------|------|
| `POST` | `/nexxa/chat` | Send a chat message to Nexxa AI | No | — |
| `POST` | `/nexxa/match` | Run Nexxa matching (PPLG/akuntansi/hotel) | No | — |
| `POST` | `/nexxa/match/validate-input` | Validate Nexxa match input | No | — |
| `POST` | `/nexxa/match/normalize-output` | Normalize Nexxa match output | No | — |

---

## Health Check

| Method | Path | Description | Auth | Role |
|--------|------|-------------|------|------|
| `GET` | `/health` | Health check | No | — |
