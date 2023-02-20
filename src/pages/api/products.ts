/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '@/services/firebase';
import { IProduct } from '@/types/product';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IMessage {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct[] | IMessage>
) {
  if (req.method === 'GET') {
    const list = async () => {
      const productsRef = collection(db, 'products');
      const productsSnapshot = await getDocs(productsRef);

      const productsList = productsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as IProduct;
      });
      return productsList;
    };

    list()
      .then((products) => {
        const priceFormat = (price: number) => {
          return price.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          });
        };

        products.map((product) => {
          product.priceFormatted = priceFormat(product.price);
        });

        res.status(200).json(products);
      })
      .catch(() => {
        res.status(404).json({ message: 'Products not found' });
      });
  }

  if (req.method === 'POST') {
    const create = async () => {
      const product: IProduct = req.body;

      const productFormatted = {
        id: String(new Date().getTime()),
        name: product.name,
        category: product.category,
        price: product.price,
        measure: product.measure,
        image: product.image,
        description: product.description,
      };

      const productRef = collection(db, 'products');
      const productSnapshot = await getDocs(productRef);
      const productExists = productSnapshot.docs.find(
        (product) => product.data().name === productFormatted.name
      );

      if (productExists) {
        throw new Error('Product already exists');
      } else {
        addDoc(collection(db, 'products'), productFormatted);
      }

      return res.status(200).json({ message: 'Product created' });
    };

    create().catch(() => {
      res.status(404).json({ message: 'Product not created' });
    });
  }
}
