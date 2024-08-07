import dynamic from 'next/dynamic';
import Image from 'next/image';

const EarTraining = dynamic(() => import('../components/EarTraining'), {
  ssr: false,
});

export default function Home() {
  return <EarTraining />;
}
