// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db');

// db.all('select * from produk', (err,rows)=>{
//     if (err){
//         console.error(err.message)
//     }
//     else{
//         console.log(rows)
//     }
// })

module.exports = db;