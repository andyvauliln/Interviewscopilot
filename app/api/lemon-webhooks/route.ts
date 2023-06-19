import { client } from '@/utils/lemon-client';
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord
} from '@/utils/supabase-admin';
import type {
  RetrieveStoreOptions,
  RetrieveStoreResult
} from 'lemonsqueezy.ts/dist/types';
import { headers } from 'next/headers';

// {
//   "type": "webhooks",
//   "id": "1",
//   "attributes": {
//     "store_id": LEMON_SQUEEZY_STORE_ID,
//     "url": "https://mysite.com/webhook/",
//     "events": [
//       "order_created",
//       "order_refunded"
//     ],
//     "last_sent_at": "2022-11-22T07:38:06.000000Z",
//     "created_at": "2022-06-07T08:32:47.000000Z",
//     "updated_at": "2022-06-07T08:41:37.000000Z",
//     "test_mode": false
//   },
// }

const relevantEvents = new Set([
  'subscription_created',
  'subscription_updated',
  'subscription_cancelled',
  'subscription_resumed',
  'subscription_expired',
  'subscription_paused',
  'subscription_unpaused',
  'subscription_payment_failed',
  'subscription_payment_success',
  'subscription_payment_recovered'
]);

export async function POST(req: Request) {
  //console.log(req, 'req');

  const body = await req.json();
  const sig = headers().get('X-Signature') as string;
  const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  console.log(sig, webhookSecret, body, 'lemon webhook');
  const event = body.attributes.events[0];
  console.log(event, 'event');

  if (sig && webhookSecret && sig === webhookSecret) {
    //console.log('we here', 'data');

    if (relevantEvents.has(event)) {
      console.log(relevantEvents.has(event), 'has relemvant');

      try {
        switch (event) {
          // case 'product.created':
          // case 'product.updated':
          //   await upsertProductRecord(event.data.object as Stripe.Product);
          //   break;
          // case 'price.created':
          // case 'price.updated':
          //   await upsertPriceRecord(event.data.object as Stripe.Price);
          //   break;
          case 'subscription_created':
          case 'subscription_updated':
          case 'subscription_expired':
          case 'subscription_cancelled':
          case 'subscription_resumed':
            console.log(body.attributes.store_id, 'data');

            const store = (await client.retrieveStore({
              id: body.attributes.store_id
            })) as RetrieveStoreResult;
            console.log(store, 'store');
            console.log(JSON.stringify(store.relationships), 'store');
            await manageSubscriptionStatusChangeLemon(store);
            // console.log(store.relationships.products, 'products');
            // console.log(store.relationships.orders, 'orders');
            // console.log(store.relationships.subscriptions, 'subscriptions');
            // console.log(store.relationships.webhooks, 'webhooks');
            // console.log(JSON.stringify(store.relationships), 'store');

            // client.retrieveStore()
            // await manageSubscriptionStatusChange(
            //   subscription.id,
            //   subscription.customer as string,
            //   event.type === 'customer.subscription.created'
            // );
            break;
          case 'subscription_payment_success':
          case 'subscription_payment_failed':
          case 'subscription_payment_recovered':
            console.log(event, 'event');

            break;
          default:
            throw new Error('Unhandled relevant event!');
        }
      } catch (error) {
        console.log(error);
        return new Response('Webhook handler failed. View logs.', {
          status: 400
        });
      }
    } else {
      console.log('Wrong webhook signiture');
      return new Response('Webhook handler failed. View logs.', {
        status: 400
      });
    }
  }
  return new Response(JSON.stringify({ received: true }));
}
