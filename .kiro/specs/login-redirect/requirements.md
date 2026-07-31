# Requirements Document

## Introduction

The Login Redirect feature adds authentication-based route protection to the JHIC-FE-User SPA. Currently all routes are freely accessible — any user can navigate directly to `/`, `/search`, `/dashboard-pkl`, etc. without logging in. This feature introduces a lightweight auth state (backed by `localStorage`) and a route guard so that:

1. Unauthenticated users are always redirected to `/login`.
2. After successful login the user is sent to the main page (`/`).
3. Authenticated users who visit `/login` are redirected straight to `/` (no double login).
4. All routes rendered inside `<Layout />` (protected routes) are inaccessible without a valid session.

No real backend is involved; the auth state is mocked via `localStorage`.

---

## Glossary

- **Auth_Service**: The module (`src/core/auth/authService.ts`) responsible for reading and writing the authentication token in `localStorage`.
- **Auth_Guard**: The route-wrapper component (`src/core/auth/AuthGuard.tsx`) that checks auth state and redirects unauthenticated users to `/login`.
- **Login_Guard**: The route-wrapper component (`src/core/auth/LoginGuard.tsx`) that redirects already-authenticated users away from `/login` to `/`.
- **Router**: The `createBrowserRouter` instance in `src/App.tsx` composed from `src/core/routes.tsx`.
- **Protected_Route**: Any route rendered as a child of `<Layout />` in `routes.tsx`.
- **Auth_Token**: A string value stored under the key `"auth_token"` in `localStorage`. Its presence indicates an authenticated session.
- **Session**: The period during which a valid `Auth_Token` exists in `localStorage`.

---

## Requirements

### Requirement 1: Auth State Management

**User Story:** As a developer, I want a centralised auth service, so that all auth reads and writes go through a single, predictable API.

#### Acceptance Criteria

1. THE Auth_Service SHALL expose a `getToken(): string | null` function that reads the `Auth_Token` from `localStorage`.
2. THE Auth_Service SHALL expose a `setToken(token: string): void` function that writes the `Auth_Token` to `localStorage`.
3. THE Auth_Service SHALL expose a `clearToken(): void` function that removes the `Auth_Token` from `localStorage`.
4. THE Auth_Service SHALL expose an `isAuthenticated(): boolean` function that returns `true` if and only if `getToken()` returns a non-empty string.
5. WHEN `clearToken()` is called, THE Auth_Service SHALL ensure `isAuthenticated()` subsequently returns `false`.
6. WHEN `setToken(token)` is called with a non-empty string, THE Auth_Service SHALL ensure `isAuthenticated()` subsequently returns `true`.

---

### Requirement 2: Protected Route Guard

**User Story:** As a user, I want protected pages to be inaccessible without login, so that my data remains secure.

#### Acceptance Criteria

1. WHEN an unauthenticated user navigates to any Protected_Route, THE Auth_Guard SHALL redirect the user to `/login`.
2. WHEN an authenticated user navigates to any Protected_Route, THE Auth_Guard SHALL render the requested route without redirection.
3. THE Auth_Guard SHALL preserve the originally requested path by passing it as `state.from` on the redirect to `/login`, so the user can be returned there after login.
4. THE Auth_Guard SHALL wrap all children of the `<Layout />` route in `routes.tsx`.

---

### Requirement 3: Login Page Guard

**User Story:** As an authenticated user, I want to be redirected away from the login page, so that I am not asked to log in twice.

#### Acceptance Criteria

1. WHEN an authenticated user navigates to `/login`, THE Login_Guard SHALL redirect the user to `/`.
2. WHEN an unauthenticated user navigates to `/login`, THE Login_Guard SHALL render the login page without redirection.

---

### Requirement 4: Post-Login Redirect

**User Story:** As a user, I want to be sent to the main page after logging in, so that I can start using the application immediately.

#### Acceptance Criteria

1. WHEN a user submits valid login credentials, THE Auth_Service SHALL store a non-empty `Auth_Token` in `localStorage`.
2. WHEN the `Auth_Token` is stored, THE Router SHALL navigate the user to the path in `state.from`, or to `/` if `state.from` is absent.
3. IF login fails (invalid credentials), THEN THE Login module SHALL display an error message and SHALL NOT store an `Auth_Token`.

---

### Requirement 5: Initial Load Behaviour

**User Story:** As a new visitor, I want to be redirected to the login page on first load, so that I cannot accidentally access protected content.

#### Acceptance Criteria

1. WHEN the SPA first loads and no `Auth_Token` exists in `localStorage`, THE Auth_Guard SHALL redirect the user to `/login` regardless of the requested path.
2. WHEN the SPA first loads and a valid `Auth_Token` exists in `localStorage`, THE Auth_Guard SHALL allow the user to reach the requested Protected_Route without redirecting to `/login`.

---

### Requirement 6: Logout

**User Story:** As a user, I want to log out so that my session is cleared and I am returned to the login page.

#### Acceptance Criteria

1. WHEN a logout action is triggered, THE Auth_Service SHALL call `clearToken()` to remove the `Auth_Token` from `localStorage`.
2. WHEN `clearToken()` is called, THE Router SHALL navigate the user to `/login`.
3. WHILE no `Auth_Token` is present, THE Auth_Guard SHALL prevent the user from accessing any Protected_Route.
