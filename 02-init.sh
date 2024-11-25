#!/bin/bash
echo "En attente de PostgreSQL..."

# Attente de la disponibilité de PostgreSQL
until psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\q"; do
  echo "En attente de PostgreSQL..."
  sleep 2
done

echo "PostgreSQL est prêt !"

# Attente de l'existence de la table 'etablissements'
echo "Vérification de l'existence de la table 'etablissements'..."
until psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -c "SELECT to_regclass('public.etablissements');" | grep -q "etablissements"; do
  echo "La table 'etablissements' n'existe pas encore, on attend..."
  sleep 5
done

echo "La table 'etablissements' existe, démarrage de l'importation..."

# Importation des données depuis le fichier CSV dans la table
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\COPY etablissements FROM '/docker-entrypoint-initdb.d/data.csv' WITH CSV HEADER DELIMITER ',';"

echo "Importation terminée !"
