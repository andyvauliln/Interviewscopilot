import type { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SECRET_HASH = process.env.TELEGRAM_BOT_SECRET_HASH;
const BASE_PATH = process.env.HOST;

import { Context, Markup, Telegraf, Telegram } from 'telegraf';
import { Update } from 'typegram';

const token: string = (process.env.BOT_TOKEN || BOT_TOKEN) as string;

const telegram: Telegram = new Telegram(token);

const bot: Telegraf<Context<Update>> = new Telegraf(token);

const chatId: string = process.env.CHAT_ID as string;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Retrieve the POST request body that gets sent from Telegram
    const body = await req.json();
    console.log(body, 'body');
    //console.log(query, 'query');
    console.log(req, 'req');

    //   if (query.setWebhook === "true") {
    const webhookUrl = `${BASE_PATH}/api/telegram?secret_hash=${SECRET_HASH}`;

    // Would be nice to somehow do this in a build file or something
    const isSet = await bot.telegram.setWebhook(webhookUrl);
    console.log(`Set webhook to ${webhookUrl}: ${isSet}`);
    //   }

    //if (query.secret_hash === SECRET_HASH) {
    await bot.handleUpdate(body);
    //}
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error('Error sending message');
    console.log(error);
  }

  bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
  });

  bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');

    ctx.reply('Send /quit to stop the bot');
  });

  bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);

    // Context shortcut
    ctx.leaveChat();
  });

  bot.command('keyboard', (ctx) => {
    ctx.reply(
      'Keyboard',
      Markup.inlineKeyboard([
        Markup.button.callback('First option', 'first'),
        Markup.button.callback('Second option', 'second')
      ])
    );
  });

  bot.on('text', (ctx) => {
    ctx.reply(
      'You choose the ' +
        (ctx.message.text === 'first' ? 'First' : 'Second') +
        ' Option!'
    );

    if (chatId) {
      telegram.sendMessage(
        chatId,
        'This message was sent without your interaction!'
      );
    }
  });

  bot.launch();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  //res.status = 200;
}
