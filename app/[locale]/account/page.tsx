import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription,
  getUserDetails
} from '@/app/supabase-server';
import Prices from '@/components/Prices';
import Button from '@/components/ui/Button';
import { useActionState } from '@/hooks/use-action-state';
import { Database } from '@/types_db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import ManageSubscriptionButton from './ManageSubscriptionButton';

export default async function Account() {
  //const { pending, response, error } = useActionState(updateEmail)
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);

  if (!session) {
    return redirect('/signin');
  }

  const user = session?.user;
  console.log(user, subscription, "************USER*********");


  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);


  const updateEmail = async (formData: FormData) => {
    'use server';

    const newEmail = formData.get('email') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const resp = await supabase.auth.updateUser({ email: newEmail });

    console.log(resp.data.user);
    console.log(resp.data);

    revalidatePath('/account');
  };

  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white atext-center sm:text-6xl ">
            Account
          </h1>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={subscription ? <ManageSubscriptionButton session={session} /> : <div>Choose your plan</div>}
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <SubscriptionPlan session={session} />
            )}
          </div>
        </Card>

        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">
                Confirm change on your current and new emails.
              </p>
              <button
                form="emailForm"
                className="text-white group relative flex left select-none items-center justify-center gap-2 px-3 py-1 outline-none focus-visible:ring-4 bg-purple-600 hover:bg-purple-700 rounded h-[36px] whitespace-nowrap text-xs transition ml-2 cursor-pointer"
                type="submit"
              >
                <span className="select-none font-bold" >Update Email</span>
              </button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="emailForm" action={updateEmail}>
              <input
                type="text"
                name="email"
                className="w-1/2 p-3 rounded-md bg-zinc-900"
                defaultValue={user ? user.email : ''}
                placeholder="Your email"
                maxLength={64}
              />
            </form>
          </div>
        </Card>
      </div>
    </section >
  );
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 border rounded-md border-zinc-700">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-500">
        {footer}
      </div>
    </div>
  );
}

async function SubscriptionPlan({ session }) {
  const products = await getActiveProductsWithPrices();

  return <div className="relative flex self-center mt-6 justify-center items-center flex-col sm:flex-row ">
    <Prices product={products[0]} />
  </div>
}


// <Card
// title={"Your Name"}
// description="Please enter your full name, or a display name you are comfortable with."
// footer={
//   <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
//     <p className="pb-4 sm:pb-0">64 characters maximum</p>
//     <button
//       form="nameForm"
//       className="text-white group relative flex left select-none items-center justify-center gap-2 px-3 py-1 outline-none focus-visible:ring-4 bg-purple-600 hover:bg-purple-700 rounded h-[36px] whitespace-nowrap text-xs transition ml-2 cursor-pointer"
//       type="submit"
//     >
//       <span className="select-none font-bold" >Update Name</span>
//     </button>

//   </div>
// }
// >
// <div className="mt-8 mb-4 text-xl font-semibold">
//   <form id="nameForm" action={updateName}>
//     <input
//       type="text"
//       name="name"
//       className="w-1/2 p-3 rounded-md bg-zinc-900"
//       defaultValue={userDetails?.full_name ?? ''}
//       placeholder="Your name"
//       maxLength={64}
//     />
//   </form>
// </div>
// </Card>
// const updateName = async (formData: FormData) => {
//   'use server';
//   console.log(formData, "form data");

//   const newName = formData.get('name') as string;
//   const supabase = createServerActionClient<Database>({ cookies });
//   const session = await getSession();
//   const user = session?.user;
//   const { error } = await supabase
//     .from('users')
//     .update({ full_name: newName })
//     .eq('id', user?.id);
//   if (error) {
//     console.log(error);
//   }
//   revalidatePath('/account');
// };