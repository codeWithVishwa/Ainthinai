# Thai Residency (MERN) — Architecture Analysis

Functional reference for the Ainthinai backend. Frontend is explicitly **not** a
design reference; only business logic is migrated.

Source: `../THAI RESIDENCY PROJECT/Backend` — 55 files, ~7,500 lines.
Stack: Node 22, Express 5, Mongoose 9, ESM, JWT, Razorpay, Nodemailer, Multer + Sharp.

---

## 1. Architecture overview

```
Backend/
  index.js                  bootstrap: cors → helmet → morgan → json(8mb)
                            → cookieParser → static /uploads → rate limit → /api
  src/config/               db, roles, properties (multi-property), upload paths
  src/models/       14      Mongoose schemas
  src/routes/        9      express-validator chains live here, not in controllers
  src/controllers/   9      request handling + most business logic
  src/services/      4      email, razorpay, googleReviews, seed
  src/middlewares/   4      auth, upload, validate, errorHandler
  src/utils/         4      booking (the pricing/availability engine), jwt, apiError
  scripts/           4      one-off migrations and image compression
```

**Layering is only partially enforced.** Genuine domain logic lives in
`utils/booking.js`; everything else sits in controllers. `adminController.js` is
1,537 lines covering users, bookings, blogs, careers, testimonials, assets,
inventory blocks, reports and email — a god-module.

**Startup side effects:** `ensureSuperAdmin()` and `ensureDefaultRooms()` run on
every boot, seeding from env vars.

---

## 2. Database schema — 14 collections

| Collection | Purpose | Key indexes |
|---|---|---|
| `User` | accounts + staff | `email` unique, `role`, `isActive` |
| `Room` | room *types*, not units | `property`, `isActive`, `channelManagerCode` |
| `Booking` | reservations | `bookingCode` unique, compound `{room, checkIn, checkOut, status}` |
| `RatePlan` | per-room pricing plans | `{room, isActive}` |
| `RatePrice` | per-date rate overrides | `{ratePlan, date}` unique, `{room, date}` |
| `DailyInventory` | per-date units + OTA restrictions | `{room, date}` unique |
| `RoomBlock` | maintenance/closure ranges | `{room, startDate, endDate}` |
| `PendingRegistration` | pre-account signup state | `registrationToken` unique, TTL on `expiresAt` |
| `PasswordResetRequest` | reset state | `resetToken` unique, TTL |
| `Blog` | articles | `slug` unique, `status` |
| `Testimonial` | curated quotes | `isActive` |
| `SiteAsset` | uploaded media registry | `category` |
| `Career` / `CareerApplication` | jobs board | — |

### Collections that do **not** exist

The brief anticipated Coupons, Notifications, Payments, Contact and Settings
collections. **None of these exist.** Specifically:

- **Payments** are denormalised onto `Booking` (`razorpayOrderId`, `paymentId`,
  `signature`, `paymentStatus`, `paymentMode`, `paymentDueAt`). There is no
  payment ledger and therefore no partial-payment or refund-amount history.
- **Notifications** are fire-and-forget email only; nothing is persisted.
- **Contact** form submissions are not stored anywhere.
- **Settings** live in environment variables.
- **Reviews** are `Testimonial` (manually curated) plus a *read-only Google
  Places* integration. Guests cannot leave reviews.

### Notable modelling decisions

- `Room` is a **room type with `totalUnits`**, not an individual room. There is
  no per-unit/room-number entity, so no room assignment at check-in.
- **Occupancy pricing** is a `Map<adultCount, price>` on both `RatePlan` and
  `RatePrice`, enabling MakeMyTrip-style per-occupancy rates.
- `Booking.pricingSnapshot` freezes the rate breakdown at booking time — correct,
  and worth preserving.
- Multi-property support exists (`thai_residency`, `new_thai_residency`) but only
  as a `Room.property` enum; no Property collection.

---

## 3. The pricing engine (`utils/booking.js`)

The most valuable asset in the project. Four layers resolve a nightly rate:

```
RatePrice.occupancyPricing[adults]     date override, per occupancy
  → RatePlan.occupancyPricing[adults]  plan tier, per occupancy
    → walk up to baseOccupancy         "next higher occupancy" fallback
      → RatePrice.price / RatePlan.basePrice
```

`resolveOccupancyRate()` walks *up* from the requested adult count toward
`baseOccupancy`, taking the first tier that is set — the date override winning at
each level. A `RatePrice` with an empty `occupancyPricing` map is treated as a
legacy flat record.

**Extras** apply only above `units × baseOccupancy`:
- extra adults: `RatePlan.extraAdultPrice ?? Room.extraAdultPrice`
- children: `RatePlan.paidChildPrice` → `Room.childAgePolicy` age bands →
  `Room.extraChildPrice` flat

Tax is `Room.taxPercent` applied to the subtotal, rounded once at the end.

---

## 4. The availability engine

`checkRoomAvailability()` runs three checks in parallel:

1. **RoomBlock** overlap → hard unavailable
2. **DailyInventory** window → `effectiveTotalUnits` is the *minimum* units
   across every night of the stay
3. **Booked units** → aggregate `$sum: units` over overlapping bookings

**Overlap predicate:** `checkIn < requestedCheckOut && checkOut > requestedCheckIn`
— correct half-open interval handling; same-day turnover is not double-counted.

**Which statuses hold inventory:** `pending`, `confirmed`, `completed`, plus
`pending_payment` *while `paymentDueAt` is in the future*. This is a 15-minute
soft hold for online payment.

**OTA restrictions** (`evaluateRestrictions`): `stopSell` on any night blocks the
window; `closeToArrival` on night one; `closeToDeparture` on the last night;
`minStay`/`maxStay` read from the **arrival night's** record only.

---

## 5. Booking workflow

```
quote (public)  → buildBookingQuote: validate range, reject past check-in,
                  enforce maxOccupancy × units, resolve rate plan (cheapest
                  active if unspecified), availability, nightly prices, tax
create (auth)   → re-quotes server-side (never trusts client price)
                  pay_at_hotel → status "pending",         paymentDueAt null
                  razorpay     → status "pending_payment", paymentDueAt +15min
                → post-insert overbooking guard: re-count units, delete and 409
                  if the total now exceeds capacity
                → back-fills user.address / user.phone
razorpay        → create order (amount×100 paise) → verify HMAC-SHA256 signature
                  (timing-safe) → confirmed + paid → confirmation email
cancel          → owner only; paid → refunded, pending → failed
expiry          → markExpiredPendingBookings() called opportunistically on
                  quote/list/dashboard reads — there is no cron
```

**Concurrency:** the post-insert guard is a read-after-write compensation, not a
transaction. Two simultaneous requests can both pass the pre-check; the loser is
deleted afterwards. It narrows the window but does not close it.

---

## 6. Authentication

Three-step registration, which is unusual and worth keeping:

```
1. POST /auth/register/start     → PendingRegistration + 6-digit code by email
2. POST /auth/register/verify    → validates code (timing-safe), marks confirmed
3. POST /auth/register/complete  → creates User, returns JWT
```

Codes are **hashed** (`sha256(token:code:secret)`), expire in 10 minutes, capped
at 5 attempts, and the whole pending record TTLs out at 30 minutes. Password
reset mirrors this exactly.

- **Hashing:** bcrypt, cost 12.
- **JWT:** `{sub, role}`, `JWT_EXPIRES_IN` default 1d, HS256.
- **Transport:** token is returned in the **response body**; `cookie-parser` is
  installed and the middleware *reads* `req.cookies.accessToken`, but no endpoint
  ever sets it. In practice the SPA holds the token in JS.
- **No logout endpoint, no refresh token, no token revocation.**
- Forgot-password does not leak account existence (always 200).

**Roles:** `super_admin` > `admin` > `moderator` > `user`.
`canManageTargetUser()` prevents admins from managing other admins or the
super-admin. Role changes are super-admin only. Self-deactivation is blocked.

---

## 7. Admin surface

`/api/admin/*` is gated by `authenticate` then `authorize(...ADMIN_PANEL_ROLES)`,
with tighter per-route roles layered on top (destructive actions typically
`SUPER_ADMIN` + `ADMIN`; content edits allow `MODERATOR`).

| Area | Capabilities |
|---|---|
| Dashboard | counts (users/rooms/bookings by status/blogs), lifetime paid revenue, users-by-role |
| Reports | status counts, time series bucketed day/month/year (auto day-bucketing when span ≤ 31 days), average booking value |
| Today | arrivals, departures, in-house count |
| Availability | matrix + calendar per room/date, room blocks CRUD |
| Bookings | list w/ status + payment + date filters, status transitions with availability re-check |
| Offline invoice | ad-hoc quote generator with discount, service charge, tax, GST fields |
| Users | list, role change, activate/deactivate, staff creation |
| Content | blogs (sanitize-html), testimonials, careers, applications, site assets |
| Inventory | daily inventory upsert + bulk, rate plans, rate prices + bulk + range delete |
| Comms | broadcast announcement email to guests/staff |

---

## 8. Security

**Present:** helmet, per-IP rate limiting (120/min global, tighter on auth),
bcrypt-12, timing-safe comparisons for both verification codes and Razorpay
signatures, `sanitize-html` on blog content, magic-byte file-type validation via
`file-type`, sharp decompression-bomb guard (50 MP cap), CORS allowlist,
`trust proxy`, passwordHash stripped in `toJSON`.

**Missing:** no CSRF protection (mitigated only because the token is not in a
cookie), no account lockout on repeated failed logins, no audit log, no refresh
token rotation, no request-body size limits per route, `strictQuery` set but no
schema-level `strict` enforcement on updates.

---

## 9. Hidden / non-obvious features

- **Google Reviews** service with a JSON file cache (`data/google-reviews-cache.json`).
- **Announcement broadcast** via `Promise.allSettled`, reporting sent/failed counts.
- **Offline invoice quote** generator — a whole sub-feature for walk-in guests.
- **Channel-manager fields** (`channelManagerCode`, `sourceChannel`,
  `channelManagerReference`) — scaffolding for OTA integration, unused.
- **Careers module** — jobs board with applications.
- **Image pipeline** — multer → magic-byte check → sharp re-encode.
- **Migration scripts** — `migrateOccupancyPricing.js` backfills the occupancy maps.

---

## 10. Strengths worth preserving

1. The **pricing resolution chain** — genuinely sophisticated, matches OTA behaviour.
2. **`pricingSnapshot`** frozen on the booking.
3. **Server-side re-quoting** on create; the client price is never trusted.
4. **Hashed, expiring, attempt-capped verification codes.**
5. **Half-open interval** overlap logic.
6. **Role hierarchy with `canManageTargetUser`.**
7. **Timing-safe comparisons** in both security-sensitive paths.

## 11. Weaknesses to fix

| Weakness | Fix in the new build |
|---|---|
| No transactions — overbooking guard is compensating | MongoDB transaction + a unique reservation guard |
| `markExpiredPendingBookings` piggybacks on reads | Explicit expiry on read **and** a scheduled route |
| 1,537-line `adminController` | Thin route handlers → service layer |
| JWT in response body, no logout | **HTTP-only cookie**, logout clears it |
| No refresh token | Short access token + refresh rotation |
| Validation split across route files, untyped | **Zod schemas colocated with services**, inferred TS types |
| No payment ledger | `Payment` collection with an append-only event trail |
| Contact submissions discarded | Persist to a `ContactMessage` collection |
| No guest reviews | `Review` tied to a completed booking |
| No audit trail on admin actions | `AuditLog` on every mutation |
| No account lockout | Failed-attempt counter + temporary lock |
| Room = type only, no unit assignment | Keep type-level; note as a future extension |
| `minStay` read only from arrival night | Evaluate across the window |

---

## 12. Feature-parity checklist for Ainthinai

**Migrate:** auth (3-step register, reset, roles), rooms + rate plans + rate
prices, daily inventory + restrictions, room blocks, availability + pricing
engine, quote → book → pay → confirm → cancel, admin dashboard/reports/today,
user management, blog, testimonials, media assets, announcements, offline quote.

**Add (fixing the gaps above):** payment ledger, contact messages, guest reviews
gated on a completed stay, audit log, refresh tokens, transactional booking.

**Drop:** Careers module (out of scope for this brief), Google Reviews cache
(replace with first-party reviews), multi-property enum (single property),
channel-manager scaffolding (unused — reintroduce when a real integration exists).

---

## 13. Mapping onto the Ainthinai domain

The existing site models **five elemental floors**, each with rooms. That maps
cleanly onto the legacy model:

- `Room` (type) keeps `totalUnits`, and gains `elementId` + `floor` so the
  existing five-world identity drives the data rather than being cosmetic.
- The ten seeded rooms in `content/rooms.ts` become the seed for the `Room`
  collection; `blocked` dates become `Booking`/`RoomBlock` records.
- `content/journal.ts` → `Blog`; `content/site.ts` FAQs → a `Faq` collection;
  gallery → `SiteAsset`; reviews → the new `Review` collection.
