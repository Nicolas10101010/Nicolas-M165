from neo4j import GraphDatabase

def main():
    URI = "neo4j+ssc://5ee27642.databases.neo4j.io"
    AUTH = ("5ee27642", "fr1Ubo9rg45iR_w4VAT9VizkzK6AKnIUBfLf2KwWz4s")
    print("Verbinde mit Neo4j AuraDB...")
    
    # 2. Treiber initialisieren
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.verify_connectivity()
        print("Verbindung erfolgreich!\n")
        
        # 3. Session öffnen und Abfrage ausführen
        # Szenario: Wir lesen alle Mitglieder und ihre gebuchten Kurse aus
        query = """
        MATCH (m:Mitglied)-[:BUCHT]->(k:Kurs)
        RETURN m.vorname AS vorname, m.nachname AS nachname, k.name AS kursname
        """
        
        print("Lese gebuchte Kurse aus der Datenbank...")
        print("-" * 40)
        
        records, summary, keys = driver.execute_query(query)
        
        # 4. Resultate im Terminal ausgeben
        for record in records:
            print(f"Mitglied: {record['vorname']} {record['nachname']} | Gebuchter Kurs: {record['kursname']}")
            
        print("-" * 40)
        print("Abfrage beendet. Verbindung wird geschlossen.")

if __name__ == "__main__":
    main()