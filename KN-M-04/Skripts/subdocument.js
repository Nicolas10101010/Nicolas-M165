// ============================================================
// KN-M-04 – Teil C: Unter-Dokumente / Arrays
// Datenbank: gymDB
// Autor: Nicolas Manser
//
// Der Trainer ist als Unterdokument in jedem Kurs eingebettet:
// kurse.trainer = { _id, name, spezialgebiet }
// ============================================================

use("gymDB");


// ------------------------------------------------------------
// Abfrage 1 – Nur einzelne Felder des Unterdokuments ausgeben
// Gibt nur den Trainer-Namen und sein Spezialgebiet aus,
// kein anderes Feld des Kurses
// ------------------------------------------------------------

print("=== Abfrage 1: Nur Felder des Unterdokuments (trainer) ausgeben ===");
db.kurse.find(
  {},
  {
    _id: 0,
    name: 1,
    "trainer.name": 1,
    "trainer.spezialgebiet": 1
  }
).forEach(printjson);


// ------------------------------------------------------------
// Abfrage 2 – Filtern nach Feld im Unterdokument
// Alle Kurse bei denen das Spezialgebiet des Trainers
// "Kraft" enthält
// ------------------------------------------------------------

print("=== Abfrage 2: Filtern nach Feld im Unterdokument ===");
db.kurse.find(
  { "trainer.spezialgebiet": { $regex: "Kraft", $options: "i" } },
  {
    _id: 0,
    name: 1,
    "trainer.name": 1,
    "trainer.spezialgebiet": 1
  }
).forEach(printjson);


// ------------------------------------------------------------
// Abfrage 3 – $unwind: Array verflachen
// mitglieder.kurs_ids ist ein Array – $unwind erstellt pro
// Eintrag im Array ein eigenes Dokument (verflacht die Ausgabe)
// ------------------------------------------------------------

print("=== Abfrage 3: $unwind – kurs_ids Array verflachen ===");
db.mitglieder.aggregate([
  {
    $unwind: "$kurs_ids"
  },
  {
    $project: {
      _id: 0,
      vorname: 1,
      nachname: 1,
      kurs_ids: 1
    }
  }
]).forEach(printjson);

print("✅ subdocument.js fertig");
