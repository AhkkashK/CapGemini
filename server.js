
uri = "mongodb+srv://hilaryjoycekamteupone:vKDuKjSF9crxVIXL@cluster0.rfs00.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world! Welcome to your Express API!');
});

/*READ*/


/*CREATE*/
app.post('/', (req, res) => {
  // Code to handle the creation of a new resource
  res.send('Resource created successfully');
});


/*UPDATE*/


/*DELETE*/


app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});



