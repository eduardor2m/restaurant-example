import { useForm, SubmitHandler } from 'react-hook-form';
import { BsFillBagCheckFill } from 'react-icons/bs';

import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import Head from 'next/head';

import { Header } from '../components/Header';
import { useCart } from '../hooks/useCart';
import { useUser } from '../hooks/useUser';
import styles from '../styles/pages/Checkout.module.scss';
import { ICart } from '../types/cart';
import { adressSchema } from '../validations/adress';

interface IFormType {
  name: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  reference: string;
  formPayment: string;
  cart: ICart[];
}

const Checkout: NextPage = () => {
  const { order } = useUser();
  const { cart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormType>({
    resolver: zodResolver(adressSchema),
  });

  const onSubmit: SubmitHandler<IFormType> = (data) => {
    order({
      name: data.name,
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      reference: data.reference,
      formPayment: data.formPayment,
      cart: cart,
    }).catch((error) => {
      alert(error.message);
    });
  };

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  function totalPriceFormatedWithTax() {
    const totalPrice = total + 5;
    return totalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Carrinho de Compras" />
        <link rel="icon" href="/assets/logo-sem-fundo.svg" />
      </Head>

      <main className={styles.main}>
        <Header title="Checkout" omitIcon={false} url="/cart" checkout={true} />
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          id="form_id"
        >
          <input type="text" placeholder="Seu nome*" {...register('name')} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <input
            type="text"
            placeholder="Nome da sua rua*"
            {...register('street')}
          />
          {errors.street?.message && <p>{errors.street?.message}</p>}
          <input
            type="text"
            placeholder="Número da casa*"
            {...register('number')}
          />
          {errors.number?.message && <p>{errors.number?.message}</p>}
          <input
            type="text"
            placeholder="Complemento*"
            {...register('complement')}
          />
          {errors.complement?.message && <p>{errors.complement?.message}</p>}
          <input
            type="text"
            placeholder="Bairro*"
            {...register('neighborhood')}
          />
          {errors.neighborhood?.message && (
            <p>{errors.neighborhood?.message}</p>
          )}
          <input
            type="text"
            placeholder="Ponto de referência*"
            {...register('reference')}
          />
          {errors.reference?.message && <p>{errors.reference?.message}</p>}
          <select {...register('formPayment')}>
            <option value="pix" selected={true}>
              Pix
            </option>
            <option value="money">Dinheiro</option>
            <option value="credit">Cartão de Crédito</option>
          </select>
          <section className={styles.addCart}>
            <button type="submit" form="form_id" value="Submit">
              <section className={styles.addCartContent}>
                <section className={styles.addCartContentIcon}>
                  <section className={styles.wrapperAddCartContentIcon}>
                    <BsFillBagCheckFill size={22} color="#fff" />
                  </section>
                </section>
                <section className={styles.addCartContentText}>
                  <p>Fazer Pedido</p>
                </section>
                <section className={styles.addCartContentPrice}>
                  <section className={styles.wrapperAddCartContentPrice}>
                    <p>{totalPriceFormatedWithTax()}</p>
                  </section>
                </section>
              </section>
            </button>
          </section>
        </form>
      </main>
    </div>
  );
};

export default Checkout;
