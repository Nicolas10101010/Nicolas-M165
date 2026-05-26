// ============================================================
// KN-M-03 – Teil A: Daten hinzufügen
// Datenbank: gymDB
// Autor: Nicolas Manser
// ============================================================

use("gymDB");

const trainerSchwarz  = ObjectId("c0904d6c0feb665c50967119");
const trainerMeier    = ObjectId("65411fc5eab518878a80a9bb");
const trainerKeller   = ObjectId("112850b40fd88dee065c99ca");

const kursYoga        = ObjectId("89ab0ac0e6c13f176681bf52");
const kursCrossfit    = ObjectId("dfb3410cae62ececb64c03dc");
const kursPilates     = ObjectId("5af863cb79e2c127710b8777");
const kursSpin        = ObjectId("1743a516006d815ef40c0789");

const mitgliedAnna    = ObjectId("f807fac6bfc3826f736862d5");
const mitgliedBen     = ObjectId("4ae0552c2d3d5d0c346a10f0");
const mitgliedClara   = ObjectId("97d2026737b390e4752f6eba");
const mitgliedDavid   = ObjectId("50c7a3ca35985fb5e41873c8");
const mitgliedEva     = ObjectId("1f926d0125d7f84d73a88c9a");

const geraetLaufband  = ObjectId("79bf37775514aa82df5765b7");
const geraetHanteln   = ObjectId("dc2e826b5444f74f1d98adfc");
const geraetRuder     = ObjectId("b183b10fbea18d4c45bcacfe");
const geraetSpin      = ObjectId("f296a037b2e303f451cb315e");

// insertOne()
db.kurse.insertOne({
  _id:             kursYoga,
  name:            "Yoga Basics",
  dauer:           60,
  max_teilnehmer:  12,
  mitglied_ids:    [mitgliedAnna, mitgliedClara, mitgliedEva],
  geraet_ids:      [geraetHanteln],
  trainer: {
    _id:           trainerSchwarz,
    name:          "Sandra Schwarz",
    spezialgebiet: "Yoga & Meditation"
  }
});

// insertMany()
db.kurse.insertMany([
  {
    _id:             kursCrossfit,
    name:            "CrossFit Advanced",
    dauer:           90,
    max_teilnehmer:  10,
    mitglied_ids:    [mitgliedBen, mitgliedDavid],
    geraet_ids:      [geraetHanteln, geraetRuder],
    trainer: {
      _id:           trainerMeier,
      name:          "Lukas Meier",
      spezialgebiet: "Kraft & Ausdauer"
    }
  },
  {
    _id:             kursPilates,
    name:            "Pilates für Einsteiger",
    dauer:           50,
    max_teilnehmer:  8,
    mitglied_ids:    [mitgliedAnna, mitgliedBen, mitgliedClara],
    geraet_ids:      [],
    trainer: {
      _id:           trainerKeller,
      name:          "Marie Keller",
      spezialgebiet: "Pilates & Stretching"
    }
  },
  {
    _id:             kursSpin,
    name:            "Spinning Power",
    dauer:           45,
    max_teilnehmer:  15,
    mitglied_ids:    [mitgliedDavid, mitgliedEva],
    geraet_ids:      [geraetSpin, geraetLaufband],
    trainer: {
      _id:           trainerMeier,
      name:          "Lukas Meier",
      spezialgebiet: "Kraft & Ausdauer"
    }
  }
]);

db.mitglieder.insertMany([
  {
    _id:            mitgliedAnna,
    vorname:        "Anna",
    nachname:       "Bauer",
    eintrittsdatum: new Date("2023-01-15"),
    kurs_ids:       [kursYoga, kursPilates]
  },
  {
    _id:            mitgliedBen,
    vorname:        "Ben",
    nachname:       "Steiner",
    eintrittsdatum: new Date("2022-06-01"),
    kurs_ids:       [kursCrossfit, kursPilates]
  },
  {
    _id:            mitgliedClara,
    vorname:        "Clara",
    nachname:       "Huber",
    eintrittsdatum: new Date("2023-03-20"),
    kurs_ids:       [kursYoga, kursPilates]
  },
  {
    _id:            mitgliedDavid,
    vorname:        "David",
    nachname:       "Zimmermann",
    eintrittsdatum: new Date("2021-11-05"),
    kurs_ids:       [kursCrossfit, kursSpin]
  },
  {
    _id:            mitgliedEva,
    vorname:        "Eva",
    nachname:       "Müller",
    eintrittsdatum: new Date("2024-02-10"),
    kurs_ids:       [kursYoga, kursSpin]
  }
]);

// insertOne()
db.geraete.insertOne({
  _id:      geraetLaufband,
  name:     "Laufband Pro 3000",
  typ:      "Kardio",
  anzahl:   5,
  kurs_ids: [kursSpin]
});

// insertMany()
db.geraete.insertMany([
  {
    _id:      geraetHanteln,
    name:     "Kurzhantel-Set",
    typ:      "Kraft",
    anzahl:   20,
    kurs_ids: [kursYoga, kursCrossfit]
  },
  {
    _id:      geraetRuder,
    name:     "Rudergerät Concept2",
    typ:      "Kardio",
    anzahl:   4,
    kurs_ids: [kursCrossfit]
  },
  {
    _id:      geraetSpin,
    name:     "Spinning Bike Elite",
    typ:      "Kardio",
    anzahl:   12,
    kurs_ids: [kursSpin]
  }
]);

print("✅ insert.js fertig");
print("=== kurse ===");
db.kurse.find().forEach(printjson);
print("=== mitglieder ===");
db.mitglieder.find().forEach(printjson);
print("=== geraete ===");
db.geraete.find().forEach(printjson);
