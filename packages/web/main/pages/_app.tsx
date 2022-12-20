import "destyle.css";
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import { store } from "@/Store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
