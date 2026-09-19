export interface UserSessionData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  blood_group?: string;
  city?: string;
  address?: string;
  role: "donor" | "recipient" | "admin" | "user";
  is_available: boolean;
  last_donation_date?: string;
}

export const sessionsMap = new Map<string, UserSessionData>();

// Pre-seed Demo Admin & Donors
sessionsMap.set("lifedrop_mock_jwt_bearer_token_123456", {
  id: 1,
  name: "System Admin",
  email: "admin@lifedrop.pk",
  phone: "03493657462",
  blood_group: "B+",
  city: "Abbottabad",
  role: "admin",
  is_available: true,
  last_donation_date: "2026-05-15",
});

sessionsMap.set("lifedrop_mock_jwt_donor_token_101", {
  id: 101,
  name: "Ahmed Khan",
  email: "ahmed@lifedrop.pk",
  phone: "03001234567",
  blood_group: "B+",
  city: "Abbottabad",
  role: "donor",
  is_available: true,
  last_donation_date: "2026-04-10",
});

sessionsMap.set("lifedrop_mock_jwt_donor_token_102", {
  id: 102,
  name: "Dr. Usman Ali",
  email: "usman@lifedrop.pk",
  phone: "03129876543",
  blood_group: "O-",
  city: "Abbottabad",
  role: "donor",
  is_available: true,
  last_donation_date: "2026-03-01",
});
