-- Wir arbeiten in unserem Keyspace
USE gym_keyspace;

-- ---------------------------------------------------------
-- 1. Tabelle: mitglieder_by_id
-- (Hier ist die mitglied_id der Partition Key)
-- ---------------------------------------------------------
-- Mitglied Anna
INSERT INTO mitglieder_by_id (mitglied_id, vorname, nachname, eintrittsdatum) 
VALUES (f807fac6-bfc3-426f-b368-62d500000001, 'Anna', 'Müller', '2023-01-15');

-- Mitglied Ben
INSERT INTO mitglieder_by_id (mitglied_id, vorname, nachname, eintrittsdatum) 
VALUES (4ae0552c-2d3d-4d0c-b46a-10f000000002, 'Ben', 'Schmid', '2023-03-20');

-- Mitglied Clara
INSERT INTO mitglieder_by_id (mitglied_id, vorname, nachname, eintrittsdatum) 
VALUES (97d20267-37b3-40e4-b52f-6eba00000003, 'Clara', 'Weber', '2023-06-10');


-- ---------------------------------------------------------
-- 2. Tabelle: kurse_by_mitglied
-- (Hier ist mitglied_id der Partition Key. Damit wir mehrere 
-- Datensätze pro Partition haben, besucht Anna ZWEI Kurse)
-- ---------------------------------------------------------
-- Anna besucht Yoga
INSERT INTO kurse_by_mitglied (mitglied_id, kurs_id, kursname, dauer, trainer_name) 
VALUES (f807fac6-bfc3-426f-b368-62d500000001, 89ab0ac0-e6c1-4f17-b681-bf5200000001, 'Yoga', 60, 'Schwarz');

-- Anna besucht Crossfit (2. Kurs für die gleiche Partition!)
INSERT INTO kurse_by_mitglied (mitglied_id, kurs_id, kursname, dauer, trainer_name) 
VALUES (f807fac6-bfc3-426f-b368-62d500000001, dfb3410c-ae62-4cec-b64c-03dc00000002, 'Crossfit', 45, 'Meier');

-- Ben besucht nur Yoga
INSERT INTO kurse_by_mitglied (mitglied_id, kurs_id, kursname, dauer, trainer_name) 
VALUES (4ae0552c-2d3d-4d0c-b46a-10f000000002, 89ab0ac0-e6c1-4f17-b681-bf5200000001, 'Yoga', 60, 'Schwarz');


-- ---------------------------------------------------------
-- 3. Tabelle: details_by_kurs
-- (Hier ist kurs_id der Partition Key. Damit wir mehrere 
-- Datensätze haben, besuchen Anna und Ben denselben Yoga-Kurs)
-- ---------------------------------------------------------
-- Anna ist im Yoga-Kurs (geraete ist ein Set)
INSERT INTO details_by_kurs (kurs_id, mitglied_id, vorname, nachname, geraete) 
VALUES (89ab0ac0-e6c1-4f17-b681-bf5200000001, f807fac6-bfc3-426f-b368-62d500000001, 'Anna', 'Müller', {'Matte', 'Block'});

-- Ben ist ebenfalls im Yoga-Kurs (2. Mitglied für die gleiche Partition!)
INSERT INTO details_by_kurs (kurs_id, mitglied_id, vorname, nachname, geraete) 
VALUES (89ab0ac0-e6c1-4f17-b681-bf5200000001, 4ae0552c-2d3d-4d0c-b46a-10f000000002, 'Ben', 'Schmid', {'Matte'});

-- Anna ist im Crossfit-Kurs
INSERT INTO details_by_kurs (kurs_id, mitglied_id, vorname, nachname, geraete) 
VALUES (dfb3410c-ae62-4cec-b64c-03dc00000002, f807fac6-bfc3-426f-b368-62d500000001, 'Anna', 'Müller', {'Kettlebell', 'Box'});