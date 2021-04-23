import { useSession, signIn } from 'next-auth/client';

import { api } from '../../services/api';
import { getStripJs } from '../../services/stripejs.p';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton ({ priceId }: SubscribeButtonProps) {
  const [ session ] = useSession();
  
  async function handleSubscribe() {
    if(!session) {
      signIn('github');
      return;
    }

    //ANCHOR -> Criar uma checkout session com o Strip.
    try{
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripJs();

      await stripe.redirectToCheckout({sessionId});
    }catch (err){
      alert(err.message);
    }
  }

  return(
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}