import "server-only";
import { google } from "googleapis";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY env vars",
    );
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSpreadsheetId() {
  const id = process.env.GOOGLE_SPREADSHEET_ID;
  if (!id) {
    throw new Error("Missing GOOGLE_SPREADSHEET_ID env var");
  }
  return id;
}

function getSheetsClient() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

/**
 * Baca data dari range tertentu di Google Sheet.
 * @param range - contoh: "Absensi!A1:F100" atau "Keuangan!A:G"
 */
export async function getSheetData(range: string) {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range,
  });
  return res.data.values ?? [];
}

/**
 * Tambahin baris baru ke sheet tertentu (append di bawah data terakhir).
 * @param sheetName - nama sheet, contoh: "Absensi"
 * @param values - array of values, contoh: ["2026-02-27", "Candra", "Hadir", "08:00", "17:00"]
 */
export async function appendRow(sheetName: string, values: string[]) {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: `${sheetName}!A:A`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
  return res.data.updates;
}

/**
 * Update data di range tertentu.
 * @param range - contoh: "Absensi!A5:F5"
 * @param values - array of values untuk mengganti isi baris
 */
export async function updateRow(range: string, values: string[]) {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: getSpreadsheetId(),
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
  return res.data;
}
