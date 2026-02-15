# Bonsai REST API - Project

This project is a REST API built with **Node.js** and **Express** designed to manage a bonsai inventory.

## JSON Structure & Choice
I have chosen this theme because I like bonsais and it is pretty easy to track both technical and numerical data, which is ideal for this API project.
- `id`: Unique identifier for each bonsai.
- `nombre` & `especie`: String data for identification.
- `precio` & `edad`: Numerical values used for filtering.
- `disponible`: A boolean flag to manage stock status.
- `estado`: A number that represents a health check score.

## Project Architecture
To ensure **Clean Code** the project follows this structure:
- `src/models/`: Contains the `Bonsai` class definition.
- `src/controllers/`: Handles the logic and data filtering.
- `src/routes/`: Defines the API endpoints and maps them to controllers.
- `src/data/`: Stores the `bonsais.json` source file.

## Setup and Installation
1. Run the command: docker compose up -d
2. Ready for testing

## Testing
Commands for testing the API:
1. Get all bonsai: https://api-bonsai.ddns.net/api/bonsais
2. Get only available: https://api-bonsai.ddns.net/api/bonsais?disponible=true
3. Get only non-available: https://api-bonsai.ddns.net/api/bonsais?disponible=false
4. LF existing ID: https://api-bonsai.ddns.net/api/bonsais/1
5. LF non-existing ID: https://api-bonsai.ddns.net/api/bonsais/999 ERROR 404
6. Range filter: https://api-bonsai.ddns.net/api/bonsais/search/price?min=50&max=100
7. POST METHOD: Use the file pruebaPOST.http