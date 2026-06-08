# ============================================================
# KN-M-07: Programmierung mit MongoDB
# Datenbank: gymDB
# Autor: Nicolas Manser
# Bibliothek: pymongo
# ============================================================

from pymongo import MongoClient
from pprint import pprint
from datetime import datetime

# ------------------------------------------------------------
# Verbindung zur MongoDB herstellen
# ------------------------------------------------------------

client = MongoClient(
    host="13.216.77.160",
    port=27017,
    username="admin",
    password="Modul165!",
    authSource="admin"
)

db = client["gymDB"]
print("✅ Verbindung zur gymDB hergestellt\n")


# ------------------------------------------------------------
# 1. Alle Kurse ausgeben (find)
# ------------------------------------------------------------

print("=== 1. Alle Kurse ===")
kurse = db.kurse.find({}, {"_id": 0, "name": 1, "dauer": 1, "max_teilnehmer": 1})
for kurs in kurse:
    pprint(kurs)
print()


# ------------------------------------------------------------
# 2. Mitglieder die nach 01.01.2023 eingetreten sind (DateTime-Filter)
# ------------------------------------------------------------

print("=== 2. Mitglieder nach 01.01.2023 ===")
mitglieder = db.mitglieder.find(
    {"eintrittsdatum": {"$gt": datetime(2023, 1, 1)}},
    {"_id": 0, "vorname": 1, "nachname": 1, "eintrittsdatum": 1}
)
for mitglied in mitglieder:
    pprint(mitglied)
print()


# ------------------------------------------------------------
# 3. Geräte vom Typ Kardio (find mit Filter)
# ------------------------------------------------------------

print("=== 3. Geräte vom Typ Kardio ===")
geraete = db.geraete.find(
    {"typ": "Kardio"},
    {"_id": 0, "name": 1, "typ": 1, "anzahl": 1}
)
for geraet in geraete:
    pprint(geraet)
print()


# ------------------------------------------------------------
# 4. Aggregation: Anzahl Geräte pro Typ
# ------------------------------------------------------------

print("=== 4. Aggregation: Anzahl Geräte pro Typ ===")
pipeline = [
    {"$group": {"_id": "$typ", "total_anzahl": {"$sum": "$anzahl"}}},
    {"$sort": {"total_anzahl": -1}}
]
result = db.geraete.aggregate(pipeline)
for doc in result:
    pprint(doc)
print()


# ------------------------------------------------------------
# 5. Neues Mitglied einfügen (insert)
# ------------------------------------------------------------

print("=== 5. Neues Mitglied einfügen ===")
neues_mitglied = {
    "vorname": "Luca",
    "nachname": "Python",
    "eintrittsdatum": datetime(2024, 6, 1),
    "kurs_ids": []
}
result = db.mitglieder.insert_one(neues_mitglied)
print(f"Eingefügt mit _id: {result.inserted_id}\n")


# ------------------------------------------------------------
# 6. Mitglied aktualisieren (update)
# ------------------------------------------------------------

print("=== 6. Mitglied Luca Python aktualisieren ===")
db.mitglieder.update_one(
    {"nachname": "Python"},
    {"$set": {"eintrittsdatum": datetime(2025, 1, 1)}}
)
aktualisiert = db.mitglieder.find_one(
    {"nachname": "Python"},
    {"_id": 0, "vorname": 1, "nachname": 1, "eintrittsdatum": 1}
)
pprint(aktualisiert)
print()


# ------------------------------------------------------------
# 7. Mitglied löschen (delete)
# ------------------------------------------------------------

print("=== 7. Mitglied Luca Python löschen ===")
result = db.mitglieder.delete_one({"nachname": "Python"})
print(f"Gelöschte Dokumente: {result.deleted_count}\n")


# ------------------------------------------------------------
# Verbindung schliessen
# ------------------------------------------------------------

client.close()
print("✅ Verbindung geschlossen")
