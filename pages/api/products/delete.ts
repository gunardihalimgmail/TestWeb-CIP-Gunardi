import { NextApiRequest, NextApiResponse } from 'next';
import { openDatabase } from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      // Validasi bahwa id ada
      if (!id) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const db = await openDatabase();

      // Ganti 'produk' dengan nama tabel yang sesuai di database Anda
      await db.run('DELETE FROM produk WHERE id = ?', id);

      // await db.close();

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
