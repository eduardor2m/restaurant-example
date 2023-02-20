/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

import { Loading } from '@/components/Loading';
import { useUser } from '@/hooks/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { hasCookie } from 'cookies-next';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/pages/Login.module.scss';
import { userSchema } from '../validations/user';

type IFormType = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const { login } = useUser();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<IFormType> = ({ email, password }) => {
    setLoading(true);
    login(email, password)
      .then(() => {
        setLoading(false);
        router.push('/admin/update');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Listagem de Produtos" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <main className={styles.main}>
        {loading && <Loading />}
        <section className={styles.login}>
          <section className={styles.header}>
            <section className={styles.logo}>
              <Image
                src={'/images/logo.svg'}
                width={50}
                height={50}
                alt="Logo"
                style={{
                  borderRadius: '50%',
                  border: '1px solid #000',
                  padding: '5px',
                  marginRight: '10px',
                }}
              />
              <p>Restaurant Example</p>
            </section>
            <p className={styles.subtitle}>Sessão de Administrador</p>
          </section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Digite seu e-mail</label>
            <input placeholder="email@gmail.com" {...register('email')} />
            {errors.email?.message && <p>{errors.email?.message}</p>}
            <label>Digite sua senha</label>
            <input
              type="password"
              placeholder="********"
              {...register('password')}
            />
            {errors.password?.message && <p>{errors.password?.message}</p>}
            <input type="submit" value="Entrar" className={styles.buttonForm} />
            <p className={styles.textPage}>
              Ir para tela de {/* <Link href={'//newuser'}> */}
              <span
                onClick={() => {
                  alert('Em desenvolvimento');
                }}
              >
                cadastro
              </span>
              {/* </Link> */}
            </p>
          </form>
        </section>
        <section className={styles.footer}>
          <section className={styles.textFooter}>
            <h1>Ou</h1>
          </section>
          <section className={styles.footerButtons}>
            <button
              type="button"
              onClick={() => {
                alert('Em desenvolvimento');
              }}
            >
              <FcGoogle
                size={20}
                style={{
                  marginRight: '10px',
                }}
              />
              Entrar com Google
            </button>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                router.push('/');
              }}
            >
              Voltar
            </button>
          </section>
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = hasCookie('@User:user', {
    req: context.req,
    res: context.res,
  });

  if (user) {
    return {
      redirect: {
        destination: '/admin/register',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
