import "destyle.css";
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import { sliceHelpers, store } from "@/Store";
import { useEffect } from "react";
import { ReduxUtils } from "@university-hub/shared/web/utils";

export default function App({ Component, pageProps }: AppProps) {  
  useEffect(() => {
    ReduxUtils.startSliceHelpers(sliceHelpers, store);

    return () => ReduxUtils.stopSliceHelpers(sliceHelpers, store)
  }, [])
  
  return (
    <Provider store={store}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
