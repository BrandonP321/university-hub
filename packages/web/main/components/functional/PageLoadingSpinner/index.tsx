import { setShowPageSpinner } from "@/Features/pageLoading/pageLoading";
import { useAppDispatch } from "@/Hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PageLoadingSpinnerProps = {
    loading: boolean;
}

/** Shows loading spinner over page when `loading` prop is true */
export function PageLoadingSpinner({ loading }: PageLoadingSpinnerProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // if component is unmounted, ensure loading spinner gets hidden
        return () => {dispatch(setShowPageSpinner({ loading: false }))}
    }, [])

    useEffect(() => {
        dispatch(setShowPageSpinner({ loading }))
    }, [loading])

    return null;
}

/** Shows loading spinner when router is transitioning between pages */
export function RouterPageLoadingSpinner() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url: string) => (url === router.asPath) && setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    return (
        <PageLoadingSpinner loading={loading}/>
    )
}