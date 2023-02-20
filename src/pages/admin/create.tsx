/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AlertCard } from '@/components/AlertCard';
import { useProduct } from '@/hooks/useProduct';
import { useUser } from '@/hooks/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from '../../components/Header';
import styles from '../../styles/pages/admin/Create.module.scss';
import { productSchema } from '../../validations/product';

type IFormType = {
  id: string;
  name: string;
  category: string;
  price: number;
  measure: string;
  image: string;
  description: string;
};

const Create: NextPage = () => {
  const { logout } = useUser();
  const { create } = useProduct();
  const router = useRouter();

  const [showAlert, setShowAlert] = useState({
    status: false,
    title: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormType>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<IFormType> = (data) => {
    create(data)
      .then(() => {
        setShowAlert({ status: true, title: 'Produto criado com sucesso!' });
      })
      .catch(() => {
        setShowAlert({ status: true, title: 'Erro ao criar produto!' });
      });
  };

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
      <Header
        title="Criar Produto"
        omitIcon={false}
        url="/admin/update"
        checkout={true}
      />
      <main className={styles.main}>
        {showAlert.status && (
          <AlertCard
            title={showAlert.title}
            handleAction={() => {
              setShowAlert({ status: false, title: '' });
            }}
          />
        )}
        <form className={styles.register} onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Nome" {...register('name')} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <select {...register('category')} defaultValue={'outros'}>
            <option value="outros" selected={true}>
              Outros
            </option>
            <option value="bebidas">Bebidas</option>
            <option value="carnes">Carnes</option>
            <option value="pizzas">Pizzas</option>
            <option value="lanches">Lanches</option>
            <option value="sobremesas">Sobremesas</option>
          </select>
          {errors.category?.message && <p>{errors.category?.message}</p>}
          <input type="text" placeholder="Preço" {...register('price')} />
          {errors.price?.message && <p>{errors.price?.message}</p>}
          <input type="text" placeholder="Medida" {...register('measure')} />
          {errors.measure?.message && <p>{errors.measure?.message}</p>}
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
          />
          {errors.description?.message && <p>{errors.description?.message}</p>}
          <input type="url" placeholder="Imagem" {...register('image')} />
          {errors.image?.message && <p>{errors.image?.message}</p>}
          <input type="submit" value="Criar Produto" />
        </form>
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

  return {
    props: {},
  };
};

export default Create;
