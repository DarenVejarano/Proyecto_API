const fs = require('fs');
const path = require('path');
const Bonsai = require('../models/Bonsai');

//JSON DATA
const rawData = fs.readFileSync(path.join(__dirname, '../data/bonsais.json'));
const bonsaisData = JSON.parse(rawData);

// 1. SHOW ALL
exports.getAllBonsais = (req, res) => {
    let listaBonsais = [];
    for (let i = 0; i < bonsaisData.length; i++) {
        const b = bonsaisData[i];
        listaBonsais.push(new Bonsai(b.id, b.nombre, b.especie, b.precio, b.disponible, b.estado));
    }
    res.json(listaBonsais);
};