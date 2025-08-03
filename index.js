require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const corsOptions = {
  origin: '*', // Podés restringir a tu dominio Firebase si querés
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));



app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error en conexión Mongo:", err));
  
  
// Revisar si toma la uri de mongo (borrar despues)

console.log("MONGO_URI:", process.env.MONGO_URI);


// Definir modelo
const Mensaje = mongoose.model('Mensaje', {
  nombre: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

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
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

