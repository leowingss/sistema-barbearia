import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import Head from 'next/head';

const styles = {
  global: {
    body: {
      color: 'gray.100'
    },
    a: {
      color: '#fff '
    }
  }
}


const colors = {
  barber: {
    900: '#12131b',
    400: '#1b1c29',
    100: '#c6c6c6'
  },
  button: {
    cta: '#fba931',
    default: '#FFF',
    gray: '#DFDFDF',
    danger: '#FF4040'
  },
  orange: {
    900: '#fba931'
  }
}

const theme = extendTheme({styles, colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}
