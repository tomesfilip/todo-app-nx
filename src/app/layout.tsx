import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import { Header } from './components/header';

import Providers from './Providers';

import './styles/global.css';

export const metadata = {
  title: 'TODO app',
  description: 'TODO app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const userId = cookies().get('userId');

  return (
    <html lang="en">
      <body>
        <Toaster />
        <Providers>
          <Header userId={userId?.value} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
