const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const csvFilePath = 'C:\Users\salim\200_lignes'; // Remplace par le chemin du fichier CSV

app.use(express.json());

// Helper pour lire le fichier CSV et renvoyer les données sous forme de tableau
function readCsvFile() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Helper pour écrire les données dans le fichier CSV
function writeCsvFile(data) {
  const headers = Object.keys(data[0]);
  const csvContent = [headers.join(','), ...data.map(row => headers.map(header => row[header]).join(','))].join('\n');
  fs.writeFileSync(csvFilePath, csvContent);
}

// CREATE
app.post('/siret', async (req, res) => {
  const newData = req.body;
  try {
    const data = await readCsvFile();
    data.push(newData);
    writeCsvFile(data);
    res.status(201).send('Nouvel enregistrement ajouté');
  } catch (error) {
    res.status(500).send('Erreur lors de la création');
  }
});

// READ
app.get('/siret/:siret', async (req, res) => {
  const siret = req.params.siret;
  try {
    const data = await readCsvFile();
    const record = data.find(row => row.siret === siret);
    if (record) {
      res.json(record);
    } else {
      res.status(404).send('Enregistrement non trouvé');
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la lecture');
  }
});

// UPDATE
app.put('/siret/:siret', async (req, res) => {
  const siret = req.params.siret;
  const updatedData = req.body;
  try {
    let data = await readCsvFile();
    const recordIndex = data.findIndex(row => row.siret === siret);
    if (recordIndex !== -1) {
      data[recordIndex] = { ...data[recordIndex], ...updatedData };
      writeCsvFile(data);
      res.send('Enregistrement mis à jour');
    } else {
      res.status(404).send('Enregistrement non trouvé');
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la mise à jour');
  }
});

// DELETE
app.delete('/siret/:siret', async (req, res) => {
  const siret = req.params.siret;
  try {
    let data = await readCsvFile();
    const newData = data.filter(row => row.siret !== siret);
    if (newData.length === data.length) {
      res.status(404).send('Enregistrement non trouvé');
    } else {
      writeCsvFile(newData);
      res.send('Enregistrement supprimé');
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
