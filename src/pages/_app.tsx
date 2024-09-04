import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from 'src/utils/theme'

import 'public/styles/fonts.css'
import 'public/styles/globals.css'
import NavBar from 'src/components/NavBar/NavBar'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
        <Head>
            <title>Ascent Airline</title> {/* Set your default title here */}
          </Head>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider></SessionProvider>
  )
}
