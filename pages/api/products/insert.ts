import { NextApiRequest, NextApiResponse } from 'next';
import { insertProduct } from './insertProduct'; // Sesuaikan dengan struktur folder Anda

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    if (req.method === 'POST') {
      const success = await insertProduct(req.body); // Assumsing data dikirim sebagai JSON di body POST request
      if (success) {
        res.status(201).json({ message: 'Product inserted successfully' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
