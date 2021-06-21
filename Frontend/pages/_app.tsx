import { useMemo } from 'react';
import { AppProps /* , AppContext */ } from 'next/app';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header';

function MyApp({ Component, pageProps }: AppProps) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode]
	);
	return (
		<>
			<Head>
				<title>SPNT - Sajermann Pocket New Testament</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<CssBaseline />
					<Header />
					<Component {...pageProps} />
					<ToastContainer />
				</AuthProvider>
			</ThemeProvider>
		</>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
