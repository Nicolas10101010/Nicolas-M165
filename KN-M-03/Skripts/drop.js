// ============================================================
// KN-M-03 – Teil B1: Alle Collections löschen
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");

db.kurse.drop();
db.mitglieder.drop();
db.geraete.drop();

print("✅ drop.js fertig – alle Collections gelöscht");
