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
app.get('/siret', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM votre_table');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la lecture des données:', error);
    res.status(500).send('Erreur lors de la lecture des données');
  }
});

/* CREATE */
app.post('/siret', async (req, res) => {
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
app.put('/siret/:siret', async (req, res) => {
  const { siret } = req.params;
  const { nom } = req.body;
  try {
    const result = await pool.query('UPDATE votre_table SET nom = $1 WHERE siret = $2 RETURNING *', [nom, siret]);
    if (result.rowCount === 0) {
      return res.status(404).send('Enregistrement non trouvé');
    }
    res.send('Enregistrement mis à jour');
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    res.status(500).send('Erreur lors de la mise à jour');
  }
});

/* DELETE */
app.delete('/siret/:siret', async (req, res) => {
  const { siret } = req.params;
  try {
    const result = await pool.query('DELETE FROM votre_table WHERE siret = $1 RETURNING *', [siret]);
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