// api/products.js
import { NextApiRequest, NextApiResponse } from 'next';
import { openDatabase } from '../database';

export default async function handler(
        req:NextApiRequest
        , res: NextApiResponse) {
  try {
    const dbs = await openDatabase();
    const data = await dbs.all('SELECT a.*, b.nama_suplier FROM produk a inner join suplier b on a.suplier_id = b.id_suplier');
    res.status(200).json(data);

  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
}