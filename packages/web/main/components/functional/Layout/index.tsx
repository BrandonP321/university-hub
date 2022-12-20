import { useEffect } from "react";
import { ReduxUtils } from "utils/ReduxUtils";

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
            <main>{children}</main>
        </>
    )
}
