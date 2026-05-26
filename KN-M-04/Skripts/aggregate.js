// ============================================================
// KN-M-04 – Teil A: Aggregationen
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");


// ------------------------------------------------------------
// Abfrage 1 – $match als Ersatz für $and aus KN-M-03
// Zwei $match-Stages hintereinander (entspricht AND-Verknüpfung)
// Mitglieder die VOR 2023 eingetreten sind UND Nachname mit "S"
// ------------------------------------------------------------

print("=== Abfrage 1: $match hintereinander (wie $and aus KN-M-03) ===");
db.mitglieder.aggregate([
  {
    $match: { eintrittsdatum: { $lt: new Date("2023-01-01") } }
  },
  {
    $match: { nachname: { $regex: "^S", $options: "i" } }
  }
]).forEach(printjson);


// ------------------------------------------------------------
// Abfrage 2 – $match + $project + $sort
// Kurse die länger als 45 Minuten dauern,
// nur Name/Dauer/max_teilnehmer ausgeben, nach Dauer sortiert
// ------------------------------------------------------------

print("=== Abfrage 2: $match + $project + $sort ===");
db.kurse.aggregate([
  {
    $match: { dauer: { $gt: 45 } }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      dauer: 1,
      max_teilnehmer: 1
    }
  },
  {
    $sort: { dauer: -1 }
  }
]).forEach(printjson);


// ------------------------------------------------------------
// Abfrage 3 – $sum (count)
// Anzahl Mitglieder pro Jahr des Eintritts zählen
// ------------------------------------------------------------

print("=== Abfrage 3: $sum – Anzahl Mitglieder pro Eintrittsjahr ===");
db.mitglieder.aggregate([
  {
    $group: {
      _id: { $year: "$eintrittsdatum" },
      anzahl_mitglieder: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]).forEach(printjson);


// ------------------------------------------------------------
// Abfrage 4 – $group
// Geräte nach Typ gruppieren und Gesamtanzahl der Geräte
// pro Typ summieren
// ------------------------------------------------------------

print("=== Abfrage 4: $group – Gesamtanzahl Geräte pro Typ ===");
db.geraete.aggregate([
  {
    $group: {
      _id: "$typ",
      total_anzahl: { $sum: "$anzahl" },
      anzahl_geraetetypen: { $sum: 1 }
    }
  },
  {
    $sort: { total_anzahl: -1 }
  }
]).forEach(printjson);

print("✅ aggregate.js fertig");
