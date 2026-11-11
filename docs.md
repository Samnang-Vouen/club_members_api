# Club Members API — Blueprint

| Action | Method | URL | Auth | Success | Error |
|---|---|---|---|---|---|
| Log in and get a token | POST | /auth/login | — | 201 + `{ access_token }` | 401 bad credentials |
| List all members | GET | /members | Public | 200 | — |
| Get one member | GET | /members/:id | Public | 200 | 404 |
| Create a member | POST | /members | JWT | 201 | 400 invalid body, 401 |
| Update a member | PATCH | /members/:id | JWT | 200 | 400, 401, 404 |
| Delete a member | DELETE | /members/:id | JWT | 204 | 401, 404 |

## Entity: Member

| Column | Type |
|---|---|
| id | int (PK, generated) |
| name | text |
| role | text |
| active | boolean (true/false status) |
| createdAt | timestamp |
| updatedAt | timestamp |
