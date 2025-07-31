const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola desde el backend en la nube 🌐');
});

app.post('/mensaje', (req, res) => {
  const { nombre, mensaje } = req.body;
  console.log("Nuevo mensaje recibido:", nombre, mensaje);
  res.status(200).json({ status: 'ok', nombre, mensaje });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
