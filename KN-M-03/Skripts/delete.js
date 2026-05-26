// ============================================================
// KN-M-03 – Teil B2: Einzelne Einträge löschen
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");

// deleteOne() – Mitglied "Eva Müller" löschen, Filterung über _id
db.mitglieder.deleteOne({
  _id: ObjectId("1f926d0125d7f84d73a88c9a")
});

print("=== mitglieder nach deleteOne (Eva weg) ===");
db.mitglieder.find().forEach(printjson);

// deleteMany() mit $or – Rudergerät und Spinning Bike löschen
// Laufband und Hanteln bleiben erhalten
db.geraete.deleteMany({
  $or: [
    { _id: ObjectId("b183b10fbea18d4c45bcacfe") },
    { _id: ObjectId("f296a037b2e303f451cb315e") }
  ]
});

print("=== geraete nach deleteMany (Ruder + Spin weg) ===");
db.geraete.find().forEach(printjson);

print("✅ delete.js fertig");
