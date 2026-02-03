const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Oppretter en "pool" av tilkoblinger for bedre ytelse
const pool = mysql.createPool({
  host: 'localhost',        // Siden du kjører databasen lokalt
  user: 'root',             // Brukernavnet du valgte under installasjonen
  password: process.env.sql_passord, // Her skriver du passordet du laget
  database: 'mydb',         // Navnet på schemaet ditt
  port: 3306,               // Standardporten du bekreftet i konfigurasjonen
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Eksporterer løftet (promise) versjon for enklere bruk med async/await
const db = pool.promise();
db.getConnection()
  .then(() => console.log("Koblet til MySQL-serveren på port 3306!"))
  .catch(err => console.error("Kunne ikke koble til databasen:", err));
module.exports = db;