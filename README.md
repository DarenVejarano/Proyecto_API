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
1. Clone the repository.
2. Run `npm install` to install dependencies (Morgan, Express, etc.).
3. Start the server using `npm start`.
4. Access the API at `http://localhost:3000/api/bonsais`.

## Implemented Features
- [x] **Task 1 & 2**: Project structure and data definition.
- [ ] **Task 3**: Dockerization (Pending).
- [ ] **Task 5**: Advanced filtering and Calculation logic (Pending).