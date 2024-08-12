import { Toaster } from 'sonner';
import './global.css';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'TODO app',
  description: 'TODO app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
