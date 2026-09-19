# LifeDrop — PHP Backend & MySQL Integration Guide

This guide explains how to connect your Next.js frontend with your **PHP (Laravel) / MySQL Backend**.

---

## 1. Environment Configuration

In `FrontEnd/lifedrop-frontend`, create or edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

If your PHP backend runs on a different port or domain (e.g. `http://127.0.0.1:8000/api/v1` or `https://api.lifedrop.pk/api/v1`), set `NEXT_PUBLIC_API_URL` accordingly.

---

## 2. API Endpoints Contract

The frontend makes REST API calls using `Authorization: Bearer {token}` and `Content-Type: application/json`.

### Public & User Endpoints

| Method  | Endpoint                  | Description            | Request Body / Query                                                                 | Expected PHP Response                                                                                     |
| :------ | :------------------------ | :--------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `POST`  | `/auth/login`             | User Login             | `{ email, password }`                                                                | `{ token: "jwt...", user: { ... } }`                                                                      |
| `POST`  | `/auth/signup`            | Register User/Donor    | `{ name, email, phone, blood_group, city, role, password, password_confirmation }`   | `{ token: "jwt...", user: { ... } }`                                                                      |
| `GET`   | `/auth/me`                | Fetch Session User     | `Headers: Authorization: Bearer {token}`                                             | `{ id, name, email, phone, blood_group, city, role, is_available }`                                       |
| `GET`   | `/donors/nearby`          | Search Active Donors   | `?blood_group=B+&city=Abbottabad`                                                    | `[ { id, name, blood_group, city, phone, is_available, is_verified }, ... ]`                              |
| `PATCH` | `/donors/me/availability` | Update Availability    | `{ blood_group, phone, city, is_available, last_donation_date }`                     | `{ message: "...", data: { ... } }`                                                                       |
| `GET`   | `/requests`               | Fetch Blood Requests   | None                                                                                 | `[ { id, patient_name, blood_group, hospital_name, city, contact_number, units, urgency, status }, ... ]` |
| `POST`  | `/requests`               | Post Emergency Request | `{ patient_name, blood_group, hospital_name, city, contact_number, units, urgency }` | `{ id, patient_name, blood_group, status: "pending", ... }`                                               |
| `PATCH` | `/requests/{id}`          | Update Status          | `{ status: "fulfilled" }`                                                            | `{ message: "Updated", id }`                                                                              |
| `POST`  | `/contact`                | Send Message           | `{ name, email, subject, message }`                                                  | `{ message: "Received" }`                                                                                 |
| `GET`   | `/stats`                  | Platform Metrics       | None                                                                                 | `{ donors_count, requests_count, hospitals_count, lives_saved }`                                          |

### Administrative Endpoints (`Authorization: Bearer {admin_token}`)

| Method  | Endpoint               | Description                | Query Parameters / Body                        | Expected PHP Response                                                        |
| :------ | :--------------------- | :------------------------- | :--------------------------------------------- | :--------------------------------------------------------------------------- |
| `GET`   | `/admin/overview`      | Platform Metrics & Stats   | None                                           | Aggregate object with metrics, blood group breakdown, timeline & recent logs |
| `GET`   | `/admin/donors`        | Donor Moderation List      | `?search=...&blood_group=...&is_available=...` | `{ total: int, data: [ ... ] }`                                              |
| `PATCH` | `/admin/donors/{id}`   | Update Verification/Status | `{ is_verified: bool, status: string }`        | `{ message: "Updated", data: { ... } }`                                      |
| `GET`   | `/admin/users`         | User & Patient List        | `?search=...&role=...&status=...`              | `{ total: int, data: [ ... ] }`                                              |
| `PATCH` | `/admin/users/{id}`    | Toggle User Account Status | `{ status: "active" \| "deactivated" }`        | `{ message: "Updated", data: { ... } }`                                      |
| `GET`   | `/admin/requests`      | Admin Blood Requests       | `?search=...&urgency=...&status=...`           | `{ total: int, data: [ ... ] }`                                              |
| `PATCH` | `/admin/requests/{id}` | Moderation Status Update   | `{ status: "fulfilled" \| "cancelled" }`       | `{ message: "Updated", data: { ... } }`                                      |
| `GET`   | `/admin/logs`          | Administrative Audit Logs  | None                                           | `{ total: int, data: [ ... ] }`                                              |

---

## 3. Database SQL Schema Setup

If you need to verify or set up your MySQL database tables for the PHP backend:

1. Open phpMyAdmin or your MySQL CLI.
2. Create a database `lifedrop_db`.
3. Import the included [`lifedrop_database.sql`](./lifedrop_database.sql) file located in the root of `lifedrop-frontend`.

---

## 4. Laravel Backend Integration Code Snippets

### Middleware: `CheckAdmin.php` (`app/Http/Middleware/CheckAdmin.php`)

```php
<?php

namespace App\Http\Middleware;

import Closure;
import Illuminate\Http\Request;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Administrative access required.'
            ], 403);
        }

        return $next($request);
    }
}
```

### Laravel API Routes: `routes/api.php`

```php
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Admin Guarded Routes
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::get('/overview', [AdminController::class, 'overview']);
        Route::get('/donors', [AdminController::class, 'getDonors']);
        Route::patch('/donors/{id}', [AdminController::class, 'updateDonor']);
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::patch('/users/{id}', [AdminController::class, 'updateUser']);
        Route::get('/requests', [AdminController::class, 'getRequests']);
        Route::patch('/requests/{id}', [AdminController::class, 'updateRequest']);
        Route::get('/logs', [AdminController::class, 'getLogs']);
    });
});
```

---

## 5. Standalone Fallback Feature

If your PHP backend is offline during local UI development or testing, the frontend automatically falls back to internal Next.js handlers (`app/api/v1/...`), ensuring the UI never crashes or shows broken layouts.
