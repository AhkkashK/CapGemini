const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurer la connexion PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'capgem',
  password: 'password',
  port: 5432,
});

// Vérifier la connexion à la base de données
pool.connect()
  .then(() => console.log('Connecté à PostgreSQL'))
  .catch(err => console.error('Erreur de connexion à PostgreSQL:', err));

// Middleware pour parser le JSON
app.use(express.json());

// Endpoint de base
app.get('/', (req, res) => {
  res.send('Hello, world! Welcome to your PostgreSQL API!');
});

/* READ */
app.get('/etablissements', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM etablissements');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la lecture des données:', error);
    res.status(500).send('Erreur lors de la lecture des données');
  }
});

/*READ2*/

app.get('/etablissements/:siret', async (req, res) => {
  const { siret } = req.params; // Récupérer le SIRET depuis les paramètres de l'URL

  try {
    const result = await pool.query('SELECT * FROM etablissements WHERE siret = $1', [siret]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Établissement non trouvé');
    }

    res.json(result.rows[0]); // Renvoyer uniquement le premier résultat trouvé
  } catch (error) {
    console.error('Erreur lors de la lecture des données:', error);
    res.status(500).send('Erreur lors de la lecture des données');
  }
});


/* CREATE */
app.post('/etablissements', async (req, res) => {
  const siret = req.body.siret;

  try {
    // Vérifier si le numéro de SIRET existe déjà dans la base de données
    const existingEntry = await pool.query('SELECT * FROM etablissements WHERE siret = $1', [siret]);

    if (existingEntry.rows.length > 0) {
      // Si le SIRET existe déjà, renvoyer un message d'erreur
      return res.status(400).send('Le numéro de SIRET existe déjà dans la base de données.');
    }

    const values = [
      req.body.siren,
      req.body.nic,
      req.body.siret,
      req.body.statut_diffusion_etablissement,
      req.body.date_creation_etablissement,
      req.body.tranche_effectifs_etablissement,
      req.body.annee_effectifs_etablissement,
      req.body.activite_principale_registre_metiers_etablissement,
      req.body.date_dernier_traitement_etablissement,
      req.body.etablissement_siege,
      req.body.nombre_periodes_etablissement,
      req.body.complement_adresse_etablissement,
      req.body.numero_voie_etablissement,
      req.body.indice_repetition_etablissement,
      req.body.type_voie_etablissement,
      req.body.libelle_voie_etablissement,
      req.body.code_postal_etablissement,
      req.body.libelle_commune_etablissement,
      req.body.libelle_commune_etranger_etablissement,
      req.body.distribution_speciale_etablissement,
      req.body.code_commune_etablissement,
      req.body.code_cedex_etablissement,
      req.body.libelle_cedex_etablissement,
      req.body.code_pays_etranger_etablissement,
      req.body.libelle_pays_etranger_etablissement,
      req.body.complement_adresse2_etablissement,
      req.body.numero_voie2_etablissement,
      req.body.indice_repetition2_etablissement,
      req.body.type_voie2_etablissement,
      req.body.libelle_voie2_etablissement,
      req.body.code_postal2_etablissement,
      req.body.libelle_commune2_etablissement,
      req.body.libelle_commune_etranger2_etablissement,
      req.body.distribution_speciale2_etablissement,
      req.body.code_commune2_etablissement,
      req.body.code_cedex2_etablissement,
      req.body.libelle_cedex2_etablissement,
      req.body.code_pays_etranger2_etablissement,
      req.body.libelle_pays_etranger2_etablissement,
      req.body.date_debut,
      req.body.etat_administratif_etablissement,
      req.body.enseigne1_etablissement,
      req.body.enseigne2_etablissement,
      req.body.enseigne3_etablissement,
      req.body.denomination_usuelle_etablissement,
      req.body.activite_principale_etablissement,
      req.body.nomenclature_activite_principale_etablissement,
      req.body.caractere_employeur_etablissement
    ];

    const query = `
      INSERT INTO etablissements (
        siren, nic, siret, statut_diffusion_etablissement, date_creation_etablissement,
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
        nomenclature_activite_principale_etablissement, caractere_employeur_etablissement
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
        $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
        $41, $42, $43, $44, $45, $46, $47, $48
      );
    `;

    await pool.query(query, values);
    res.status(201).send('Enregistrement ajouté avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des données :', error);
    res.status(500).send('Erreur lors de l\'ajout des données');
  }
});

/* UPDATE */
app.put('/etablissements/:siret', async (req, res) => {
  const { siret } = req.params; // Le numéro de SIRET de l'établissement à mettre à jour
  const updatedFields = req.body; // Champs à mettre à jour (tous les champs fournis dans le body)

  // Vérifier que le champ 'siret' n'est pas inclus dans le body
  if (updatedFields.siret) {
    return res.status(400).send('Le champ "siret" ne peut pas être modifié');
  }

  // Vérifier que le corps de la requête n'est pas vide
  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).send('Aucun champ à mettre à jour');
  }

  try {
    // Vérifier si le SIRET existe déjà dans la base de données
    const checkSiretResult = await pool.query('SELECT * FROM etablissements WHERE siret = $1', [siret]);

    if (checkSiretResult.rows.length === 0) {
      return res.status(404).send('Établissement non trouvé');
    }

    // Construire la requête SQL de mise à jour de manière dynamique
    let updateQuery = 'UPDATE etablissements SET ';
    let updateValues = [];
    let counter = 1;

    // Parcourir les champs envoyés dans le corps de la requête et ajouter les champs à la requête SQL
    for (let field in updatedFields) {
      if (updatedFields.hasOwnProperty(field)) {
        updateQuery += `${field} = $${counter}, `;
        updateValues.push(updatedFields[field]);
        counter++;
      }
    }

    // Retirer la dernière virgule de la requête SQL
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += ` WHERE siret = $${counter}`;
    updateValues.push(siret);

    // Exécuter la requête de mise à jour
    const updateResult = await pool.query(updateQuery, updateValues);

    // Vérifier si la mise à jour a eu un effet
    if (updateResult.rowCount === 0) {
      return res.status(404).send('Établissement non trouvé');
    }

    res.send('Établissement mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'établissement:', error);
    res.status(500).send('Erreur serveur');
  }
});


/* DELETE */
app.delete('/etablissements/:siret', async (req, res) => {
  const { siret } = req.params;
  try {
    const result = await pool.query('DELETE FROM etablissements WHERE siret = $1 RETURNING *', [siret]);
    if (result.rowCount === 0) {
      return res.status(404).send('Enregistrement non trouvé');
    }
    res.send('Enregistrement supprimé');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).send('Erreur lors de la suppression');
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
