/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { AlertCard } from '@/components/AlertCard';
import { CardUpdate } from '@/components/CardUpdate';
import { useUser } from '@/hooks/useUser';
import { IProduct } from '@/types/product';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from '../../components/Header';
import styles from '../../styles/pages/admin/Update.module.scss';

const Edit: NextPage = ({
  allProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { logout } = useUser();
  const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [showAlert, setShowAlert] = useState({
    status: false,
    title: '',
  });

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  async function handleRevalidate() {
    axios(
      process.env.DEVELOPING === 'true'
        ? `${process.env.URL}/api/revalidate`
        : `https://espeto-gaucho.vercel.app/api/revalidate`
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Carrinho de Compras" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <main className={styles.main}>
        {showAlert.status && (
          <AlertCard
            title={showAlert.title}
            handleAction={() => {
              setShowAlert({ status: false, title: '' });
            }}
          />
        )}
        <Header
          title="Atualizar Produto"
          omitIcon={false}
          url="/admin/create"
          checkout={true}
        />
        <section className={styles.listDelete}>
          <section className={styles.products}>
            {products.length > 0 ? (
              products.map((product) => (
                <CardUpdate key={product.id} data={product} />
              ))
            ) : (
              <h1>Nenhum produto cadastrado</h1>
            )}
          </section>
        </section>
        <button
          type="button"
          onClick={() => {
            handleRevalidate().then(() => {
              setShowAlert({
                status: true,
                title: 'Atualizações lançadas com sucesso!',
              });
            });
          }}
          style={{
            backgroundColor: '#1d3557',
          }}
        >
          Lançar Produtos
        </button>
        <button
          type="button"
          onClick={() => {
            logout()
              .then(() => {
                router.push('/login');
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          style={{
            backgroundColor: '#EB5757',
            marginTop: '-5px',
          }}
        >
          Sair
        </button>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = hasCookie('@EspetoGaucho:user', {
    req: context.req,
    res: context.res,
  });

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { data } = await axios.get<IProduct[]>(
    process.env.DEVELOPING === 'true'
      ? `${process.env.URL}/api/products`
      : `https://${process.env.VERCEL_URL}/api/products`
  );

  if (!data) {
    return {
      props: {
        allProducts: [],
      },
    };
  }

  return {
    props: {
      allProducts: data,
    },
  };
};

export default Edit;
