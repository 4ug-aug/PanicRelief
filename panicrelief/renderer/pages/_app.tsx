import React from 'react'
import type { AppProps } from 'next/app'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Theme
        radius="medium"
        >
        <Component {...pageProps} />
      
      </Theme>
      <ToastContainer stacked />
    </div>
  )
}

export default MyApp
