const express = require('express');
const path = require('path');
const logger = require('morgan'); // Require for logs

// Routes import
const bonsaiRoutes = require('./routes/bonsai-routes');

const app = express();

// --- MIDDLEWARES ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// --- ROUTES ---
// ALL ROUTES ATTACHED TO /api/bonsais
app.use('/api/bonsais', bonsaiRoutes);

// Routes error
app.use((req, res) => {
    res.status(404).json({ error: "El endpoint no se ha encontrado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;