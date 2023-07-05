

import Providers from '@/components/Providers';

export default function RootLayout({ children }) {

    console.log('Hi from Root Layout***************');

    return <Providers>{children}</Providers>
    // return children
}
