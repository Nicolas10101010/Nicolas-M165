// ============================================================
// KN-M-06 – Teil B: Validierung hinterlegen
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");

// ------------------------------------------------------------
// Neue Rolle für den admin-Benutzer damit er Validierungen
// hinzufügen kann (dbAdmin-Rolle auf gymDB)
// ------------------------------------------------------------

use("admin");
db.grantRolesToUser("admin", [
  { role: "dbAdmin", db: "gymDB" }
]);
print("✅ Rolle dbAdmin auf gymDB für admin hinzugefügt");

use("gymDB");

// ------------------------------------------------------------
// Validierung für Collection: mitglieder (via mongosh)
// ------------------------------------------------------------

db.runCommand({
  collMod: "mitglieder",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vorname", "nachname", "eintrittsdatum"],
      properties: {
        vorname: {
          bsonType: "string",
          description: "Vorname – Pflichtfeld, muss string sein"
        },
        nachname: {
          bsonType: "string",
          description: "Nachname – Pflichtfeld, muss string sein"
        },
        eintrittsdatum: {
          bsonType: "date",
          description: "Eintrittsdatum – Pflichtfeld, muss date sein"
        },
        kurs_ids: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
print("✅ Validierung für mitglieder hinterlegt");


// ------------------------------------------------------------
// Validierung für Collection: geraete (via mongosh)
// ------------------------------------------------------------

db.runCommand({
  collMod: "geraete",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "typ", "anzahl"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name – Pflichtfeld, muss string sein"
        },
        typ: {
          bsonType: "string",
          enum: ["Kardio", "Kraft"],
          description: "Typ – Pflichtfeld, nur Kardio oder Kraft erlaubt"
        },
        anzahl: {
          bsonType: "int",
          minimum: 1,
          description: "Anzahl – Pflichtfeld, muss int >= 1 sein"
        },
        kurs_ids: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
print("✅ Validierung für geraete hinterlegt");


// ------------------------------------------------------------
// Bestehende Validierung auslesen
// ------------------------------------------------------------

print("=== Validierung mitglieder ===");
const mitgliederInfo = db.getCollectionInfos({ name: "mitglieder" });
printjson(mitgliederInfo[0].options.validator);

print("=== Validierung geraete ===");
const geraeteInfo = db.getCollectionInfos({ name: "geraete" });
printjson(geraeteInfo[0].options.validator);


// ------------------------------------------------------------
// Testen: Ungültiges Dokument einfügen (soll Fehler geben)
// ------------------------------------------------------------

print("=== Test: Ungültiges Mitglied ohne Pflichtfelder (Fehler erwartet) ===");
try {
  db.mitglieder.insertOne({ vorname: "Test" });
} catch (e) {
  print("Fehler wie erwartet: " + e.message);
}

print("=== Test: Gerät mit ungültigem Typ (Fehler erwartet) ===");
try {
  db.geraete.insertOne({ name: "Testgerät", typ: "Schwimmen", anzahl: 1 });
} catch (e) {
  print("Fehler wie erwartet: " + e.message);
}

print("=== Test: Gültiges Mitglied (kein Fehler erwartet) ===");
db.mitglieder.insertOne({
  vorname: "Test",
  nachname: "User",
  eintrittsdatum: new Date("2024-01-01"),
  kurs_ids: []
});
print("✅ Gültiges Dokument erfolgreich eingefügt");

print("✅ validation.js fertig");
