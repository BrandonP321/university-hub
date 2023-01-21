import "destyle.css";
import '../styles/globals.scss'
import type { AppContext, AppProps } from 'next/app'
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import { sliceHelpers, store } from "@/Store";
import { useEffect, useRef } from "react";
import { ReduxUtils } from "@university-hub/shared/web/utils";
import { SiteColorsMap } from "@university-hub/shared/common/utils";
import axios from "axios";
import { UniversityApiEndpoints } from "@university-hub/shared/api/endpoints"

/** Props passed into each page component */
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
    /* if pageProps obj is populated, we can cache that data to use it across all pages */
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

App.getInitialProps = async function getServerSideProps({ router }: any): Promise<{ pageProps: AppPageProps } | {}> {
  /* Detect whether or not `.getInitialProps()` is running on the server */
  const isRunningOnServer = router.isSsr === undefined
  
  /** Only pre-fetch data if .getInitialProps() is be executed for the first time, which would happen on the server */
  if (isRunningOnServer) {
    const { data } = await axios.get<UniversityApiEndpoints.GetUniversityShallow["ResBody"]>(`${process.env.NEXT_PUBLIC_API_DOMAIN}/university/uw/shallow`, { withCredentials: true });

    return { pageProps: { siteColors: data.siteColors, isInitialPropsMap: true } }
  } else {
    return {}
  }
}

export default App;