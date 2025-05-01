'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from './layout.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <QueryClientProvider client={queryClient}>
        <body className={styles.content}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
