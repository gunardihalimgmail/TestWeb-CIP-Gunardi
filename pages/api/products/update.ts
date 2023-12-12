import { NextApiRequest, NextApiResponse } from 'next';
import { openDatabase } from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { nama, deskripsi, harga, stok, foto, suplier } = req.body;

      // Validasi bahwa id ada
      if (!id) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const db = await openDatabase();

      // Ganti 'produk' dengan nama tabel yang sesuai di database Anda
      await db.run(
        'UPDATE produk SET nama = ?, deskripsi = ?, harga = ?, stok = ?, foto = ?, suplier_id = ? WHERE id = ?',
        nama,
        deskripsi,
        harga,
        stok,
        foto,
        suplier,
        id
      );

      // await db.close();

      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
