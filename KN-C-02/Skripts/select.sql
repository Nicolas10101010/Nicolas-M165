-- 1. Screen: Profil des Mitglieds anzeigen (Wir rufen Annas Profil ab)
SELECT vorname, nachname, eintrittsdatum 
FROM mitglieder_by_id 
WHERE mitglied_id = f807fac6-bfc3-426f-b368-62d500000001;

-- 2. Screen: Meine gebuchten Kurse (Wir zeigen Annas Kurse an)
SELECT kursname, dauer, trainer_name 
FROM kurse_by_mitglied 
WHERE mitglied_id = f807fac6-bfc3-426f-b368-62d500000001;

-- 3. Screen: Kurs-Verwaltung / Teilnehmerliste (Trainer ruft Yoga-Kurs ab)
SELECT vorname, nachname, geraete 
FROM details_by_kurs 
WHERE kurs_id = 89ab0ac0-e6c1-4f17-b681-bf5200000001;