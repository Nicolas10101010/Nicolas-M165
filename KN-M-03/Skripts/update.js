// ============================================================
// KN-M-03 – Teil D: Daten verändern
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");

// updateOne() – Filterung über _id, auf Collection kurse
db.kurse.updateOne(
  { _id: ObjectId("89ab0ac0e6c13f176681bf52") },
  { $set: { max_teilnehmer: 15 } }
);
print("=== updateOne: Yoga Basics max_teilnehmer auf 15 ===");
db.kurse.find({ _id: ObjectId("89ab0ac0e6c13f176681bf52") }).forEach(printjson);

// updateMany() – ODER-Verknüpfung, OHNE _id, auf Collection mitglieder
db.mitglieder.updateMany(
  {
    $or: [
      { nachname: "Bauer" },
      { nachname: "Huber" }
    ]
  },
  { $set: { eintrittsdatum: new Date("2024-01-01") } }
);
print("=== updateMany: Bauer + Huber neues Eintrittsdatum ===");
db.mitglieder.find({
  $or: [{ nachname: "Bauer" }, { nachname: "Huber" }]
}).forEach(printjson);

// replaceOne() – auf Collection geraete
db.geraete.replaceOne(
  { _id: ObjectId("79bf37775514aa82df5765b7") },
  {
    name:     "Laufband Pro 5000",
    typ:      "Kardio",
    anzahl:   6,
    kurs_ids: [ObjectId("1743a516006d815ef40c0789")]
  }
);
print("=== replaceOne: Laufband Pro 3000 → 5000 ===");
db.geraete.find({ _id: ObjectId("79bf37775514aa82df5765b7") }).forEach(printjson);

print("✅ update.js fertig");
