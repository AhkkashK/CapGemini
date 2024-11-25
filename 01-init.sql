CREATE TABLE IF NOT EXISTS etablissements (
    siren VARCHAR(9),
    nic VARCHAR(5),
    siret VARCHAR(14),
    statut_diffusion_etablissement VARCHAR(255),
    date_creation_etablissement VARCHAR(20),
    tranche_effectifs_etablissement VARCHAR(50),
    annee_effectifs_etablissement INTEGER,
    activite_principale_registre_metiers_etablissement VARCHAR(50),
    date_dernier_traitement_etablissement VARCHAR(50),
    etablissement_siege BOOLEAN,
    nombre_periodes_etablissement INTEGER,
    complement_adresse_etablissement VARCHAR(255),
    numero_voie_etablissement VARCHAR(20),
    indice_repetition_etablissement VARCHAR(20),
    type_voie_etablissement VARCHAR(50),
    libelle_voie_etablissement VARCHAR(255),
    code_postal_etablissement VARCHAR(20),
    libelle_commune_etablissement VARCHAR(255),
    libelle_commune_etranger_etablissement VARCHAR(255),
    distribution_speciale_etablissement VARCHAR(50),
    code_commune_etablissement VARCHAR(20),
    code_cedex_etablissement VARCHAR(20),
    libelle_cedex_etablissement VARCHAR(255),
    code_pays_etranger_etablissement VARCHAR(20),
    libelle_pays_etranger_etablissement VARCHAR(255),
    complement_adresse2_etablissement VARCHAR(255),
    numero_voie2_etablissement VARCHAR(20),
    indice_repetition2_etablissement VARCHAR(20),
    type_voie2_etablissement VARCHAR(50),
    libelle_voie2_etablissement VARCHAR(255),
    code_postal2_etablissement VARCHAR(20),
    libelle_commune2_etablissement VARCHAR(255),
    libelle_commune_etranger2_etablissement VARCHAR(255),
    distribution_speciale2_etablissement VARCHAR(50),
    code_commune2_etablissement VARCHAR(20),
    code_cedex2_etablissement VARCHAR(20),
    libelle_cedex2_etablissement VARCHAR(255),
    code_pays_etranger2_etablissement VARCHAR(20),
    libelle_pays_etranger2_etablissement VARCHAR(255),
    date_debut VARCHAR(20),
    etat_administratif_etablissement CHAR(1),
    enseigne1_etablissement VARCHAR(255),
    enseigne2_etablissement VARCHAR(255),
    enseigne3_etablissement VARCHAR(255),
    denomination_usuelle_etablissement VARCHAR(255),
    activite_principale_etablissement VARCHAR(50),
    nomenclature_activite_principale_etablissement VARCHAR(50),
    caractere_employeur_etablissement CHAR(1)
);

-- Création de l'index sur la colonne siret
CREATE INDEX IF NOT EXISTS idx_siret ON etablissements(siret);
