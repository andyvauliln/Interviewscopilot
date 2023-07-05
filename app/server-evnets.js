import { Configuration, OpenAIApi } from 'openai';

export const runtime = 'nodejs';
// This is required to enable streaming
export const dynamic = 'force-dynamic';

export async function GET() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    writer.write(encoder.encode('Vercel is a platform for....'));

    try {
        const openaiRes = await openai.createCompletion(
            {
                model: 'text-davinci-002',
                prompt: 'Vercel is a platform for',
                max_tokens: 100,
                temperature: 0,
                stream: true,
            },
            { responseType: 'stream' }
        );

        // @ts-ignore
        openaiRes.data.on('data', async (data: Buffer) => {
            const lines = data
                .toString()
                .split('\n')
                .filter((line: string) => line.trim() !== '');
            for (const line of lines) {
                const message = line.replace(/^data: /, '');
                if (message === '[DONE]') {
                    console.log('Stream completed');
                    writer.close();
                    return;
                }
                try {
                    const parsed = JSON.parse(message);
                    await writer.write(encoder.encode(`${parsed.choices[0].text}`));
                } catch (error) {
                    console.error('Could not JSON parse stream message', message, error);
                }
            }
        });
    } catch (error) {
        console.error('An error occurred during OpenAI request', error);
        writer.write(encoder.encode('An error occurred during OpenAI request'));
        writer.close();
    }

    return new Response(responseStream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache, no-transform',
        },
    });
}