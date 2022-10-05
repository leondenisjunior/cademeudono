import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import Header from '../components/Header'
import { ThemeProvider } from '@mui/material'
import Context from '../context';
import 'react-toastify/dist/ReactToastify.css'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <ThemeProvider theme={theme}>
        <ToastContainer data-testid="toast" />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Context>
  )
}

export default MyApp
