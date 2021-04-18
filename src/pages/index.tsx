import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

import { GetServerSideProps } from 'next';

import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    productId: string;
    amount: number;
  }
}

export default function Home({ product }:HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>New about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.productId}/>
        </section>

        <img src="images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async() => {
  const price = await stripe.prices.retrieve('price_1Ihf79Ln6UkPM8pLWxqgLctA');
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    }
  };
}