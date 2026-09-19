import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

let initialRequests = [
  {
    id: 201,
    patient_name: "Tariq Mahmood",
    blood_group: "B+",
    hospital_name: "Ayub Medical Complex",
    hospital: "Ayub Medical Complex",
    city: "Abbottabad",
    contact_number: "03493657462",
    phone: "03493657462",
    units: 2,
    urgency: "critical",
    status: "pending",
    created_at: "2026-08-26",
  },
  {
    id: 202,
    patient_name: "Fatima Khan",
    blood_group: "O-",
    hospital_name: "PIMS Hospital",
    hospital: "PIMS Hospital",
    city: "Islamabad",
    contact_number: "03009876543",
    phone: "03009876543",
    units: 1,
    urgency: "urgent",
    status: "pending",
    created_at: "2026-08-25",
  },
  {
    id: 203,
    patient_name: "Muhammad Rizwan",
    blood_group: "A+",
    hospital_name: "Lady Reading Hospital",
    hospital: "Lady Reading Hospital",
    city: "Peshawar",
    contact_number: "03331122334",
    phone: "03331122334",
    units: 3,
    urgency: "normal",
    status: "fulfilled",
    created_at: "2026-08-24",
  },
];

export async function GET() {
  try {
    const rows: any = await queryDb(
      "SELECT id, patient_name, blood_group, hospital_name, city, contact_number, units, urgency, status, created_at FROM blood_requests ORDER BY id DESC"
    );

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(rows);
    }
  } catch (err) {
    console.warn("[MySQL Requests] DB unavailable. Using fallback requests.");
  }

  return NextResponse.json(initialRequests);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const patientName = body.patient_name || "Emergency Patient";
    const bloodGroup = body.blood_group || "B+";
    const hospitalName = body.hospital_name || body.hospital || "Local Hospital";
    const city = body.city || "Abbottabad";
    const contactNumber = body.contact_number || body.phone || "03000000000";
    const units = Number(body.units) || 1;
    const urgency = body.urgency || "urgent";
    const status = "pending";

    try {
      const res: any = await queryDb(
        `INSERT INTO blood_requests (patient_name, blood_group, hospital_name, city, contact_number, units, urgency, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [patientName, bloodGroup, hospitalName, city, contactNumber, units, urgency, status]
      );

      const insertedId = res.insertId || Date.now();
      const newReq = {
        id: insertedId,
        patient_name: patientName,
        blood_group: bloodGroup,
        hospital_name: hospitalName,
        hospital: hospitalName,
        city: city,
        contact_number: contactNumber,
        phone: contactNumber,
        units: units,
        urgency: urgency,
        status: status,
        created_at: new Date().toISOString().split("T")[0],
      };

      return NextResponse.json(newReq, { status: 201 });
    } catch (dbErr) {
      console.warn("[MySQL Insert] DB offline. Inserting to mock list.");
    }

    const newReq = {
      id: Date.now(),
      patient_name: patientName,
      blood_group: bloodGroup,
      hospital_name: hospitalName,
      hospital: hospitalName,
      city: city,
      contact_number: contactNumber,
      phone: contactNumber,
      units: units,
      urgency: urgency,
      status: status,
      created_at: new Date().toISOString().split("T")[0],
    };

    initialRequests.unshift(newReq);
    return NextResponse.json(newReq, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to post emergency request" }, { status: 400 });
  }
}
