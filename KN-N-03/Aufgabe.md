# Drehbuch: KN-N-03 - Python und Neo4j AuraDB

## Ausgangslage

Das Ziel dieses Moduls ist es, über ein Python-Skript eine Verbindung zu einer cloudbasierten Graphdatenbank (Neo4j AuraDB) herzustellen. Die in der Datenbank gespeicherten Knoten (Gym-Mitglieder und Kurse) sollen über Python mit einer Cypher-Abfrage ausgelesen und im Terminal ausgegeben werden.

## 1. Vorbereitung der Datenbank

1. Erstellung einer Neo4j AuraDB (Free Tier) Instanz.
2. Das `insert_skript.txt` (KN-M-02) wurde über den Neo4j Browser (Query-Tab) ausgeführt, um die Datenbank mit den Testdaten (Mitglieder wie Anna, Ben, Clara und die entsprechenden Kurse) zu füllen.

## 2. Python-Umgebung einrichten

Damit Python mit Neo4j kommunizieren kann, wurde der offizielle Treiber über das Terminal installiert:
`pip install neo4j`

## 3. Das Python-Skript (`neo4j_gymdb.py`)

Das Skript baut eine sichere Verbindung zur Cloud-Datenbank auf und führt einen `MATCH`-Befehl aus, um die Mitglieder auszulesen.

## 4. Ausführung und Ergebnis

Das Skript wurde über das Terminal mit `python neo4j_gymdb.py` ausgeführt.
Die Verbindung wurde erfolgreich hergestellt und die Daten der Gym-Mitglieder wurden im Terminal ausgegeben.
Der Nachweis der erfolgreichen Ausführung ist im Screenshot `skript_ausführen.png` dokumentiert.
