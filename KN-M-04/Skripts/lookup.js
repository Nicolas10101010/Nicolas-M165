// ============================================================
// KN-M-04 – Teil B: Join-Aggregation mit $lookup
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");


// ------------------------------------------------------------
// Abfrage 1 – $lookup: mitglieder → kurse
// Für jedes Mitglied die zugehörigen Kurs-Dokumente einbinden.
// Felder aus beiden Collections sind im Resultat vorhanden.
// ------------------------------------------------------------

print("=== Abfrage 1: $lookup – Mitglieder mit ihren Kursen ===");
db.mitglieder.aggregate([
  {
    $lookup: {
      from:         "kurse",       // Ziel-Collection
      localField:   "kurs_ids",    // Feld in mitglieder
      foreignField: "_id",         // Feld in kurse
      as:           "kurse"        // Name des neuen Arrays
    }
  },
  {
    $project: {
      _id: 0,
      vorname: 1,
      nachname: 1,
      "kurse.name": 1,
      "kurse.dauer": 1
    }
  }
]).forEach(printjson);


// ------------------------------------------------------------
// Abfrage 2 – $lookup + $match (Filterung nach Join)
// Nur Mitglieder die in einem Kurs mit mehr als 60 Min sind
// ------------------------------------------------------------

print("=== Abfrage 2: $lookup + $match – Mitglieder in langen Kursen ===");
db.mitglieder.aggregate([
  {
    $lookup: {
      from:         "kurse",
      localField:   "kurs_ids",
      foreignField: "_id",
      as:           "kurse"
    }
  },
  {
    $match: { "kurse.dauer": { $gt: 60 } }
  },
  {
    $project: {
      _id: 0,
      vorname: 1,
      nachname: 1,
      "kurse.name": 1,
      "kurse.dauer": 1
    }
  }
]).forEach(printjson);


// ------------------------------------------------------------
// Abfrage 3 – $lookup + $unwind + $group
// Kurse mit ihren Geräten joinen, dann Anzahl Geräte pro Kurs
// zählen
// ------------------------------------------------------------

print("=== Abfrage 3: $lookup + $unwind + $group – Anzahl Geräte pro Kurs ===");
db.kurse.aggregate([
  {
    $lookup: {
      from:         "geraete",
      localField:   "geraet_ids",
      foreignField: "_id",
      as:           "geraete"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      anzahl_geraete: { $size: "$geraete" },
      "geraete.name": 1
    }
  },
  {
    $sort: { anzahl_geraete: -1 }
  }
]).forEach(printjson);

print("✅ lookup.js fertig");
