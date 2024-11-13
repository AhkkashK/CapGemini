
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world! Welcome to your Express API!');
});

/*READ*/


/*CREATE*/


/*UPDATE*/


/*DELETE*/
app.delete('/siret/:siret', async (req, res) => {
  const siret = req.params.siret;
  try {
    let data = await readCsvFile();
    const newData = data.filter(row => row.siret && row.siret.toString() !== siret.toString());
    if (newData.length === data.length) {
      res.status(404).send('Enregistrement non trouvé');
    } else {
      writeCsvFile(newData);
      res.send('Enregistrement supprimé');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).send('Erreur lors de la suppression');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
