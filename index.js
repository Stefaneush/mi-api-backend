require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ MongoDB error:", err));

const Mensaje = mongoose.model('Mensaje', {
  nombre: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

app.get('/', (req, res) => res.send('API funcionando 🚀'));

app.post('/mensaje', async (req, res) => {
  const { nombre, mensaje } = req.body;
  try {
    const nuevo = new Mensaje({ nombre, mensaje });
    await nuevo.save();
    res.status(201).json({ ok: true, mensaje: "Mensaje guardado" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

