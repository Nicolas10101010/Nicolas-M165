// ============================================================
// KN-M-03 – Teil C: Daten abfragen
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");

// Abfrage 1 – Projektion MIT _id
print("=== Abfrage 1: Kurse länger als 50min (Projektion mit _id) ===");
db.kurse.find(
  { dauer: { $gt: 50 } },
  { _id: 1, name: 1, dauer: 1 }
).forEach(printjson);

// Abfrage 2 – ODER-Verknüpfung, nicht auf _id
print("=== Abfrage 2: ODER – max 10 Teilnehmer ODER kürzer als 60min ===");
db.kurse.find({
  $or: [
    { max_teilnehmer: { $lte: 10 } },
    { dauer: { $lt: 60 } }
  ]
}).forEach(printjson);

// Abfrage 3 – Regex
print("=== Abfrage 3: Regex – Name enthält Pilates oder Yoga ===");
db.kurse.find({
  name: { $regex: "pilates|yoga", $options: "i" }
}).forEach(printjson);

// Abfrage 4 – DateTime-Filterung + Projektion OHNE _id
print("=== Abfrage 4: Mitglieder nach 01.01.2023 (Projektion ohne _id) ===");
db.mitglieder.find(
  { eintrittsdatum: { $gt: new Date("2023-01-01") } },
  { _id: 0, vorname: 1, nachname: 1, eintrittsdatum: 1 }
).forEach(printjson);

// Abfrage 5 – UND-Verknüpfung (andere Collection als $or)
print("=== Abfrage 5: UND – vor 2023 eingetreten UND Nachname beginnt mit S ===");
db.mitglieder.find({
  $and: [
    { eintrittsdatum: { $lt: new Date("2023-01-01") } },
    { nachname: { $regex: "^S", $options: "i" } }
  ]
}).forEach(printjson);

// Abfrage 6 – geraete, Projektion ohne _id
print("=== Abfrage 6: Geräte vom Typ Kardio (ohne _id) ===");
db.geraete.find(
  { typ: "Kardio" },
  { _id: 0, name: 1, typ: 1, anzahl: 1 }
).forEach(printjson);

print("✅ find.js fertig");
