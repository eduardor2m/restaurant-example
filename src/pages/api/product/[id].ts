/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '@/services/firebase';
import { IProduct, IProductWithRef } from '@/types/product';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IMessage {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct[] | IMessage>
) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    const del = async () => {
      const productsRef = collection(db, 'products');
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          ref: doc.ref,
        } as IProductWithRef;
      });

      if (productsList) {
        await deleteDoc(
          productsList.find((product) => product.id === id)?.ref as any
        );

        const products = productsList.filter((product) => product.id !== id);

        return res.status(200).json(products);
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    };

    del();
  }
}
