import "destyle.css";
import '../styles/globals.scss'
import type { AppContext, AppProps } from 'next/app'
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import { sliceHelpers, store } from "@/Store";
import { useEffect, useRef } from "react";
import { ReduxUtils } from "@university-hub/shared/web/utils";
import { SiteColorsMap } from "@university-hub/shared/common/utils";

export type AppPageProps = {
  siteColors: SiteColorsMap;
  isInitialPropsMap: boolean;
}

function App({ Component, pageProps }: AppProps<AppPageProps>) {
  const cachedPageProps = useRef<null | AppPageProps>(null);

  useEffect(() => {
    ReduxUtils.startSliceHelpers(sliceHelpers, store);

    return () => ReduxUtils.stopSliceHelpers(sliceHelpers, store)
  }, [])

  useEffect(() => {
    /** if pageProps obj is populated, we can cache that data to use it on all pages */
    pageProps.isInitialPropsMap && (cachedPageProps.current = pageProps);
  }, [pageProps])
  
  return (
    <Provider store={store}>
      <Layout siteColors={pageProps.siteColors}>
          <Component {...(cachedPageProps.current ?? pageProps)} />
      </Layout>
    </Provider>
  )
}

const tempColors: SiteColorsMap = {
  primaryBgColor: "rgb(100, 0, 0)",
  secondaryBgColor: "rgb(0, 0, 0)",
  primaryTextColor: "rgb(0, 0, 0)",
  secondaryTextColor: "rgb(0, 0, 0)",
}

App.getInitialProps = async function getServerSideProps({ router }: any): Promise<{ pageProps: AppPageProps } | {}> {
  /** Detects whether or not `.getInitialProps()` is running on the server */
  const isRunningOnServer = router.isSsr === undefined
  
  /** Only pre-fetch data if .getInitialProps() is be executed for the first time, which would be on the server */
  if (isRunningOnServer) {
    // TODO: replace this simulated server response delay with an actual API fetch
    const res = await (new Promise((resolve, reject) => {
        setTimeout(resolve, 0);
    }))
    
    return { pageProps: { siteColors: tempColors, isInitialPropsMap: true } }
  } else {
    return {}
  }
}

export default App;