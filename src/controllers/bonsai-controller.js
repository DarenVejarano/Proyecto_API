const fs = require('fs');
const path = require('path');
const Bonsai = require('../models/Bonsai');

// Cargar los datos del JSON
const rawData = fs.readFileSync(path.join(__dirname, '../data/bonsais.json'));
const bonsaisData = JSON.parse(rawData);

// 1. LISTAR TODOS (Con filtro opcional por disponibilidad)
exports.getAllBonsais = async (req, res) => {
    let disponibleQuery = req.query.disponible;
    let listaFinal = [];

    for (let i = 0; i < bonsaisData.length; i++) {
        let b = bonsaisData[i];
        let bonsai = new Bonsai(b.id, b.nombre, b.especie, b.precio, b.edad, b.disponible, b.estado);

        // Si el usuario envió ?disponible=... en la URL
        if (disponibleQuery !== undefined) {
            let valorBuscado = (disponibleQuery === 'true');
            if (bonsai.disponible === valorBuscado) {
                listaFinal.push(bonsai);
            }
        } else {
            // Si no hay filtro, añadimos todos
            listaFinal.push(bonsai);
        }
    }
    return res.json(listaFinal);
};

// 2. OBTENER UN BONSÁI POR ID
exports.getBonsaiById = async (req, res) => {
    let idBuscado = req.params.id;

    for (let i = 0; i < bonsaisData.length; i++) {
        let b = bonsaisData[i];

        if (b.id == idBuscado) {
            let bonsai = new Bonsai(b.id, b.nombre, b.especie, b.precio, b.edad, b.disponible, b.estado);
            return res.json(bonsai);
        }
    }
    // Si recorre todo el for y no encuentra nada
    return res.status(404).json({ error: "Bonsái no encontrado" });
};

// 3. FILTRAR POR RANGO DE PRECIO (Lógica manual)
exports.filterByPrice = async (req, res) => {
    let min = parseFloat(req.query.min) || 0;
    let max = parseFloat(req.query.max) || 9999;
    let filtrados = [];

    for (let i = 0; i < bonsaisData.length; i++) {
        if (bonsaisData[i].precio >= min && bonsaisData[i].precio <= max) {
            let b = bonsaisData[i];
            filtrados.push(new Bonsai(b.id, b.nombre, b.especie, b.precio, b.edad, b.disponible, b.estado));
        }
    }
    return res.json(filtrados);
};

// 4. CALCULAR SALUD (Adaptación de la Task 5 con bucles manuales)
exports.calculateHealth = async (req, res) => {
    let evaluaciones = req.body; // Array de inspectores
    let reporteFinal = [];

    if (!Array.isArray(evaluaciones)) {
        return res.status(400).json({ error: "Se esperaba un array de evaluaciones" });
    }

    // Bucle para procesar cada inspector y sus notas
    for (let i = 0; i < evaluaciones.length; i++) {
        let e = evaluaciones[i];

        // Calcular promedio manualmente
        let suma = 0;
        for (let j = 0; j < e.points.length; j++) {
            suma += e.points[j];
        }
        let promedio = Math.round(suma / e.points.length);

        reporteFinal.push({
            inspector: e.surname + ", " + e.name,
            averageScore: promedio,
            status: promedio >= 7 ? "Excellent" : "Needs Care"
        });
    }

    // Ordenación alfabética manual (Burbuja o Sort nativo con lógica clara)
    reporteFinal.sort((a, b) => {
        if (a.inspector < b.inspector) return -1;
        if (a.inspector > b.inspector) return 1;
        return 0;
    });

    return res.json(reporteFinal);
};