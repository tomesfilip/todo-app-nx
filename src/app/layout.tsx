import { Toaster } from 'sonner';
import Providers from './Providers';
import './styles/global.css';

export const metadata = {
  title: 'TODO app',
  description: 'TODO app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
