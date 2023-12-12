import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { openDatabase } from '../database';


export async function insertProduct(productData:any) {
  try {
    const db = await openDatabase();

    
    // Menyusun query SQL
    const query = `
      INSERT INTO produk (nama, deskripsi, harga, stok, foto, suplier_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Menjalankan query dengan parameter yang diberikan
    const result = await db.run(query, [
      productData.nama,
      productData.deskripsi,
      productData.harga,
      productData.stok,
      productData.foto,
      productData.suplier,
    ]);
    
    // await db.close();
    return true;
    
  } catch (error) {
    console.error(error);
    return false;
  }
}
