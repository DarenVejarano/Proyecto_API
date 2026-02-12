const fs = require('fs');
const path = require('path');
const Bonsai = require('../models/Bonsai');

// JSON DATA
const rawData = fs.readFileSync(path.join(__dirname, '../data/bonsais.json'));
const bonsaisData = JSON.parse(rawData); //ALL JSON DATA IN 1 CONST USED FOR EVEY CONTROLLER

// 1. BONSAI (ALL & BOOLEAN CHECK)
exports.getAllBonsais = async (req, res) => {
    let disponibleQuery = req.query.disponible;
    let listaFinal = [];

    for (let i = 0; i < bonsaisData.length; i++) {
        let b = bonsaisData[i];
        let bonsai = new Bonsai(b.id, b.nombre, b.especie, b.precio, b.edad, b.disponible, b.estado);

        // IF ?disponible= IN URL
        if (disponibleQuery !== undefined) {
            let valorBuscado = (disponibleQuery === 'true');
            if (bonsai.disponible === valorBuscado) {
                listaFinal.push(bonsai);
            }
        } else {
            // IF NO FILTER PUSH ALL THE BONSAI
            listaFinal.push(bonsai);
        }
    }
    return res.json(listaFinal);
};

// 2. SEARCH BY ID
exports.getBonsaiById = async (req, res) => {
    let idBuscado = req.params.id;

    for (let i = 0; i < bonsaisData.length; i++) {
        let b = bonsaisData[i];

        if (b.id == idBuscado) {
            let bonsai = new Bonsai(b.id, b.nombre, b.especie, b.precio, b.edad, b.disponible, b.estado);
            return res.json(bonsai);
        }
    }
    // IN CASE NO ID IS FOUND
    return res.status(404).json({ error: "Bonsái no encontrado" });
};

// 3. RANGE PRICE FILTER
exports.filterByPrice = async (req, res) => {
    // Setting a max and min value
    let min = parseFloat(req.query.min) || 0;
    let max = parseFloat(req.query.max) || 9999;
    let filtrados = [];

    // If the bonsai price is on range, we add it into the filtrados array
    for (let i = 0; i < bonsaisData.length; i++) {
        if (bonsaisData[i].precio >= min && bonsaisData[i].precio <= max) {
            let b = bonsaisData[i];
            filtrados.push(new Bonsai(b.id, b.nombre, b.especie, b.precio, b.edad, b.disponible, b.estado));
        }
    }
    return res.json(filtrados);
};

// 4. HEALTH STATUS
// Inspectors evaluate the bonsais and give then 5 marks as health checks
exports.calculateHealth = async (req, res) => {
    let evaluaciones = req.body; // Inspector array
    let reporteFinal = [];

    if (!Array.isArray(evaluaciones)) {
        return res.status(400).json({ error: "Se esperaba un array de evaluaciones" });
    }

    // Processing the inspector array data
    for (let i = 0; i < evaluaciones.length; i++) {
        let e = evaluaciones[i];

        // AVG mark
        let suma = 0;
        for (let j = 0; j < e.points.length; j++) {
            suma += e.points[j];
        }
        let promedio = Math.round(suma / e.points.length);

        // Output structure
        reporteFinal.push({
            bonsai_identificado: e.bonsai_id,
            inspector: e.surname + ", " + e.name,
            averageScore: promedio,
            status: promedio >= 7 ? "Excellent" : "Needs Care"
        });
    }

    // Alphabetic order
    reporteFinal.sort((a, b) => {
        if (a.inspector < b.inspector) return -1;
        if (a.inspector > b.inspector) return 1;
        return 0;
    });

    return res.json(reporteFinal);
};