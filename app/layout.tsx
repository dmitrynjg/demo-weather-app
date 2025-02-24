'use client';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './store';
import TransitionProvider from './providers/TransitionProvider';
import { fontRoboto } from '@/shared';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={fontRoboto.className}>
        <Provider store={store}>
          <TransitionProvider>{children}</TransitionProvider>
        </Provider>
      </body>
    </html>
  );
}
