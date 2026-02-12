const express = require('express');
const path = require('path');
const logger = require('morgan'); // Para los Logs que pide la rúbrica

// Importar las rutas
const bonsaiRoutes = require('./routes/bonsai-routes');

const app = express();

// --- MIDDLEWARES ---
app.use(logger('dev')); // Logger: registra cada petición en la consola (RA5: Logs)
app.use(express.json()); // Vital para que el controlador POST /calculate funcione
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// --- RUTAS ---
// Conectamos todas las rutas de bonsáis al prefijo /api/bonsais
app.use('/api/bonsais', bonsaiRoutes);

// Manejo de errores 404 (Ruta no encontrada)
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint no encontrado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;