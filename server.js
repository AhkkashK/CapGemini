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
app.post('etablissements/', async (req, res) => {
  const { siret, nom } = req.body;
  try {
    await pool.query('INSERT INTO votre_table (siret, nom) VALUES ($1, $2)', [siret, nom]);
    res.status(201).send('Enregistrement ajouté');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des données:', error);
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
