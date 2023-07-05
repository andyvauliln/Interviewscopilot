'use client'
import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Prices({
  product
}: Props) {

  const handleCheckout = async (price: Price) => {
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });
      // redirect to checkout
      // const stripe = await getStripe();
      // stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    }
  };

  return <div class="w-full flex flex-wrap gap-4"> {
    product.prices?.map((price) => {
      const priceString =
        price.unit_amount &&
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: price.currency!,
          minimumFractionDigits: 0
        }).format(price.unit_amount / 100);

      return (
        <div class="flex flex-grow p-4 shadow-all2 shadow-purple-500 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div class="p-6 flex flex-col w-full flex-grow">
            <div className='w-full'>
              <span className="text-5xl font-extrabold white">
                {priceString}
              </span>
              <span className="text-base font-medium text-zinc-100">
                /{price.interval}
              </span>
            </div>
            <div className="w-full flex flex-grow mt-4 text-zinc-300">{price.description}</div>
            <button
              type="button"
              onClick={() => handleCheckout(price)}
              className="w-full relative flex select-none items-center flex-wrap justify-center gap-2 px-3 py-1 outline-none focus-visible:ring-4 bg-purple-600 hover:bg-purple-700 rounded h-[36px] whitespace-nowrap text-xs transition mt-2 cursor-pointer"
              type="submit"
            >
              <span className="select-none font-bold" >Subscribe</span>
            </button>
          </div>
        </div>
      );
    })}
  </div>

}


// return (
//   <section className="bg-black">
//     <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:flex-col sm:align-center">
//         <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
//           Pricing Plans
//         </h1>
//         <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
//           Start building for free, then add a site plan to go live. Account
//           plans unlock additional features.
//         </p>
//         <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
//           {intervals.includes('month') && (
//             <button
//               onClick={() => setBillingInterval('month')}
//               type="button"
//               className={`${
//                 billingInterval === 'month'
//                   ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
//                   : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
//               } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
//             >
//               Monthly billing
//             </button>
//           )}
//           {intervals.includes('year') && (
//             <button
//               onClick={() => setBillingInterval('year')}
//               type="button"
//               className={`${
//                 billingInterval === 'year'
//                   ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
//                   : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
//               } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
//             >
//               Yearly billing
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
//         {products.map((product) => {
//           const price = product?.prices?.find(
//             (price) => price.interval === billingInterval
//           );
//           if (!price) return null;
//           const priceString = new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: price.currency!,
//             minimumFractionDigits: 0
//           }).format((price?.unit_amount || 0) / 100);
//           return (
//             <div
//               key={product.id}
//               className={cn(
//                 'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
//                 {
//                   'border border-pink-500': subscription
//                     ? product.name === subscription?.prices?.products?.name
//                     : product.name === 'Freelancer'
//                 }
//               )}
//             >
//               <div className="p-6">
//                 <h2 className="text-2xl font-semibold leading-6 text-white">
//                   {product.name}
//                 </h2>
//                 <p className="mt-4 text-zinc-300">{product.description}</p>
//                 <p className="mt-8">
//                   <span className="text-5xl font-extrabold white">
//                     {priceString}
//                   </span>
//                   <span className="text-base font-medium text-zinc-100">
//                     /{billingInterval}
//                   </span>
//                 </p>
//                 <Button
//                   variant="slim"
//                   type="button"
//                   disabled={!session}
//                   loading={priceIdLoading === price.id}
//                   onClick={() => handleCheckout(price)}
//                   className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
//                 >
//                   {product.name === subscription?.prices?.products?.name
//                     ? 'Manage'
//                     : 'Subscribe'}
//                 </Button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   </section>
// );