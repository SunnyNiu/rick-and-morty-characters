import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick and Morty Characters',
  description: 'List of characters from Rick and Morty',
};

import { ChakraProvider } from '@chakra-ui/react';

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
