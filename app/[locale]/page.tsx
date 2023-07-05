import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription
} from '@/app/supabase-server';

import Features from '@/components/FeaturesPage/Features';

export default async function HomePage() {

  return (
    <>
      <Features />
    </>
  );
}