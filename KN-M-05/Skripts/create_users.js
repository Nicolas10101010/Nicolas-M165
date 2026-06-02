// ============================================================
// KN-M-05 – Teil A: Benutzer erstellen
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

// ------------------------------------------------------------
// Benutzer 1: leser_gym
// - Darf nur lesen (built-in Rolle: "read")
// - Authentifizierungsdatenbank: gymDB
// ------------------------------------------------------------

use("gymDB");

db.createUser({
  user: "leser_gym",
  pwd:  "Leser123!",
  roles: [
    { role: "read", db: "gymDB" }
  ]
});

print("✅ Benutzer 'leser_gym' erstellt (read auf gymDB)");


// ------------------------------------------------------------
// Benutzer 2: schreiber_gym
// - Darf lesen und schreiben (built-in Rolle: "readWrite")
// - Authentifizierungsdatenbank: admin
// ------------------------------------------------------------

use("admin");

db.createUser({
  user: "schreiber_gym",
  pwd:  "Schreiber123!",
  roles: [
    { role: "readWrite", db: "gymDB" }
  ]
});

print("✅ Benutzer 'schreiber_gym' erstellt (readWrite auf gymDB, authSource=admin)");
