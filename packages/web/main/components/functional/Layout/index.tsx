import FullPageLoadingSpinner from "@/UIComponents/FullPageLoadingSpinner";
import { useEffect } from "react";
import { ReduxUtils } from "utils/ReduxUtils";
import { RouterPageLoadingSpinner } from "../PageLoadingSpinner";

type LayoutProps = {
    children: React.ReactNode;
}

/**
 * App layout that persists across all pages
 */
export default function Layout({ children }: LayoutProps) {
    useEffect(() => {
        ReduxUtils.initializeStores();

        return ReduxUtils.destroyStores
    }, [])

    return (
        <>
            <FullPageLoadingSpinner/>
            <RouterPageLoadingSpinner/>
            <main>{children}</main>
        </>
    )
}
