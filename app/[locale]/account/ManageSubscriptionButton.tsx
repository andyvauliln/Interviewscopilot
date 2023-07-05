'use client';

import Button from '@/components/ui/Button';
import { postData } from '@/utils/helpers';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface Props {
  session: Session;
}

export default function ManageSubscriptionButton({ session }: Props) {
  const router = useRouter();
  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: '/api/create-portal-link'
      });
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">Manage your subscription.</p>
      <button
        disabled={!session}
        onClick={redirectToCustomerPortal}
        className="text-white group relative flex left select-none items-center justify-center gap-2 px-3 py-1 outline-none focus-visible:ring-4 bg-purple-600 hover:bg-purple-700 rounded h-[36px] whitespace-nowrap text-xs transition ml-2 cursor-pointer"
      >
        <span className="select-none font-bold" >Open Paymant Portal</span>
      </button>
    </div>
  );
}
