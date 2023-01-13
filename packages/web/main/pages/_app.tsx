import "destyle.css";
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import { ReduxSliceHelpers, store } from "@/Store";
import { useEffect } from "react";
import { ReduxUtils } from "@university-hub/shared/web/utils";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ReduxUtils.startSliceHelpers(ReduxSliceHelpers);

    return ReduxUtils.stopSliceHelpers(ReduxSliceHelpers)
  }, [])
  
  return (
    <Provider store={store}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
