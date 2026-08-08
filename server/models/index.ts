/**
 * Domain constants shared by the schemas.
 *
 * Kept in one place so a status string is never spelled out twice — the legacy
 * project repeated its booking-status arrays across the model, two controllers
 * and the availability engine, and they had already drifted apart.
 */

export const ROLES = ["guest", "moderator", "admin", "super_admin"] as const;
export type Role = (typeof ROLES)[number];

/** Ordered weakest → strongest. Used for hierarchy checks. */
export const ROLE_RANK: Record<Role, number> = {
  guest: 0,
  moderator: 1,
  admin: 2,
  super_admin: 3,
};

export const STAFF_ROLES: Role[] = ["moderator", "admin", "super_admin"];

export const BOOKING_STATUSES = [
  "pending_payment", // online payment started, soft hold until paymentDueAt
  "pending", // pay-at-hotel, awaiting staff confirmation
  "confirmed",
  "checked_in",
  "completed",
  "cancelled",
  "expired", // hold lapsed before payment
  "no_show",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/**
 * Statuses that consume inventory.
 *
 * `pending_payment` is conditional — it only holds while `paymentDueAt` is in
 * the future — so it is deliberately absent here and handled by the query in
 * the availability service.
 */
export const INVENTORY_HOLDING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "checked_in",
  "completed",
];

export const PAYMENT_STATUSES = [
  "unpaid",
  "partially_paid",
  "paid",
  "refunded",
  "partially_refunded",
  "failed",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_MODES = ["pay_at_hotel", "online"] as const;
export type PaymentMode = (typeof PAYMENT_MODES)[number];

export const MEAL_PLANS = [
  "room_only",
  "breakfast",
  "half_board",
  "full_board",
] as const;
export type MealPlan = (typeof MEAL_PLANS)[number];

/** The five landscape floors. Mirrors content/elements.ts. */
export const ELEMENT_IDS = ["earth", "river", "hill", "peak", "ocean"] as const;
export type ElementId = (typeof ELEMENT_IDS)[number];

export const ROOM_CATEGORIES = ["Room", "Suite", "House"] as const;
export type RoomCategory = (typeof ROOM_CATEGORIES)[number];
