CREATE TABLE IF NOT EXISTS etablissements (
    siren VARCHAR(9),
    nic VARCHAR(5),
    siret VARCHAR(14),
    statut_diffusion_etablissement VARCHAR(255),
    date_creation_etablissement VARCHAR(10),
    tranche_effectifs_etablissement VARCHAR(50),
    annee_effectifs_etablissement INTEGER,
    activite_principale_registre_metiers_etablissement VARCHAR(50),
    date_dernier_traitement_etablissement VARCHAR(50),
    etablissement_siege BOOLEAN,
    nombre_periodes_etablissement INTEGER,
    complement_adresse_etablissement VARCHAR(255),
    numero_voie_etablissement VARCHAR(10),
    indice_repetition_etablissement VARCHAR(10),
    type_voie_etablissement VARCHAR(50),
    libelle_voie_etablissement VARCHAR(255),
    code_postal_etablissement VARCHAR(10),
    libelle_commune_etablissement VARCHAR(255),
    libelle_commune_etranger_etablissement VARCHAR(255),
    distribution_speciale_etablissement VARCHAR(50),
    code_commune_etablissement VARCHAR(5),
    code_cedex_etablissement VARCHAR(5),
    libelle_cedex_etablissement VARCHAR(255),
    code_pays_etranger_etablissement VARCHAR(10),
    libelle_pays_etranger_etablissement VARCHAR(255),
    complement_adresse2_etablissement VARCHAR(255),
    numero_voie2_etablissement VARCHAR(10),
    indice_repetition2_etablissement VARCHAR(10),
    type_voie2_etablissement VARCHAR(50),
    libelle_voie2_etablissement VARCHAR(255),
    code_postal2_etablissement VARCHAR(10),
    libelle_commune2_etablissement VARCHAR(255),
    libelle_commune_etranger2_etablissement VARCHAR(255),
    distribution_speciale2_etablissement VARCHAR(50),
    code_commune2_etablissement VARCHAR(5),
    code_cedex2_etablissement VARCHAR(5),
    libelle_cedex2_etablissement VARCHAR(255),
    code_pays_etranger2_etablissement VARCHAR(10),
    libelle_pays_etranger2_etablissement VARCHAR(255),
    date_debut VARCHAR(10),
    etat_administratif_etablissement CHAR(1),
    enseigne1_etablissement VARCHAR(255),
    enseigne2_etablissement VARCHAR(255),
    enseigne3_etablissement VARCHAR(255),
    denomination_usuelle_etablissement VARCHAR(255),
    activite_principale_etablissement VARCHAR(50),
    nomenclature_activite_principale_etablissement VARCHAR(50),
    caractere_employeur_etablissement CHAR(1)
);



-- Vérifier si des données existent déjà (par exemple si la table est vide)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM etablissements LIMIT 1) THEN
        COPY etablissements(siren, nic, siret, statut_diffusion_etablissement, date_creation_etablissement, 
                            tranche_effectifs_etablissement, annee_effectifs_etablissement, 
                            activite_principale_registre_metiers_etablissement, date_dernier_traitement_etablissement, 
                            etablissement_siege, nombre_periodes_etablissement, complement_adresse_etablissement, 
                            numero_voie_etablissement, indice_repetition_etablissement, type_voie_etablissement, 
                            libelle_voie_etablissement, code_postal_etablissement, libelle_commune_etablissement, 
                            libelle_commune_etranger_etablissement, distribution_speciale_etablissement, 
                            code_commune_etablissement, code_cedex_etablissement, libelle_cedex_etablissement, 
                            code_pays_etranger_etablissement, libelle_pays_etranger_etablissement, 
                            complement_adresse2_etablissement, numero_voie2_etablissement, 
                            indice_repetition2_etablissement, type_voie2_etablissement, libelle_voie2_etablissement, 
                            code_postal2_etablissement, libelle_commune2_etablissement, 
                            libelle_commune_etranger2_etablissement, distribution_speciale2_etablissement, 
                            code_commune2_etablissement, code_cedex2_etablissement, libelle_cedex2_etablissement, 
                            code_pays_etranger2_etablissement, libelle_pays_etranger2_etablissement, date_debut, 
                            etat_administratif_etablissement, enseigne1_etablissement, enseigne2_etablissement, 
                            enseigne3_etablissement, denomination_usuelle_etablissement, activite_principale_etablissement, 
                            nomenclature_activite_principale_etablissement, caractere_employeur_etablissement)
        FROM '/docker-entrypoint-initdb.d/data.csv' WITH CSV HEADER DELIMITER ';';
    END IF;
END $$;

