'use client'

export default function Hero() {
    const t = {}

    return (
        <section className="h-screen bg-cover bg-center" style={{ "backgroundImage": "url('/assets/pricing_bg.jpeg')" }}>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <h1 className='text-2xl font-bold text-gray-200'>Next JS 13 Background Image with Tailwind CSS </h1>
                <p className='mt-4 text-sm text-white'>lorem ipsom Next JS 13 Background Image with Tailwind CSS</p>
            </div>
        </section>

    );
}
